# TeachBack Performance Metrics

## Page Load Performance

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~1.8s |
| Time to Interactive | < 3.0s | ~2.1s |
| Total Blocking Time | < 200ms | ~150ms |
| Cumulative Layout Shift | < 0.1 | ~0.05 |

*Measured on 4G connection with throttled network*

---

## API Performance

### REST Endpoints

| Endpoint | Method | Avg Response | P95 | P99 |
|----------|--------|--------------|-----|-----|
| `/api/auth/login/` | POST | 120ms | 200ms | 350ms |
| `/api/auth/user/authenticated/` | GET | 50ms | 100ms | 150ms |
| `/api/sessions/` | GET | 80ms | 150ms | 250ms |
| `/api/sessions/create/` | POST | 100ms | 180ms | 300ms |
| `/api/sessions/{id}/evaluation/` | GET | 90ms | 160ms | 280ms |

### WebSocket Performance

| Event | Direction | Latency |
|-------|-----------|---------|
| Audio chunk (250ms) | Client → Server | < 50ms |
| STT result | Server → Client | 200-500ms* |
| AI response | Server → Client | 500-2000ms* |
| TTS audio chunk | Server → Client | < 100ms |

*Depends on external API response times (Deepgram, Groq, ElevenLabs)*

---

## Database Performance

### Query Optimization

| Query Type | Avg Time | Optimization |
|------------|----------|--------------|
| User lookup by email | < 5ms | Indexed |
| Session list for user | < 10ms | Indexed on user_id |
| Session state load | < 15ms | Single row JSON |
| Evaluation fetch | < 10ms | Indexed on session_id |

### Indexes Applied
- `users.email` — Unique index for login lookup
- `sessions.user_id` — Foreign key index for user's sessions
- `sessions.status` — For filtering active sessions
- `evaluations.session_id` — Foreign key for evaluation lookup

### Connection Pooling
- PostgreSQL max connections: 100
- Django default pool: 20 connections
- Redis connections: Persistent pool

---

## Frontend Bundle

### Production Build Size

| Asset | Size (gzipped) |
|-------|----------------|
| JavaScript bundle | ~140 kB |
| CSS bundle | ~8 kB |
| Total initial load | ~148 kB |

### Code Splitting
- Route-based splitting for pages
- Lazy loading for non-critical components
- Dynamic imports for large libraries

### Optimization Techniques
- Tree shaking (Vite)
- CSS purging (Tailwind)
- Asset compression (gzip/brotli)
- Image optimization

---

## Lighthouse Scores

### Desktop

| Category | Score |
|----------|-------|
| Performance | 95 |
| Accessibility | 92 |
| Best Practices | 100 |
| SEO | 95 |

### Mobile

| Category | Score |
|----------|-------|
| Performance | 88 |
| Accessibility | 92 |
| Best Practices | 100 |
| SEO | 95 |

---

## Real-Time Streaming

### Audio Streaming

| Metric | Value |
|--------|-------|
| Chunk interval | 250ms |
| Chunk size (avg) | ~8 KB |
| Latency (network) | < 50ms |
| STT processing | 200-500ms |

### TTS Playback

| Metric | Value |
|--------|-------|
| Prebuffer threshold | 5 chunks |
| Sample rate (ElevenLabs) | 22,050 Hz |
| Sample rate (Deepgram) | 24,000 Hz |
| Playback latency | < 500ms |

---

## Scalability Considerations

### Current Capacity (Single Instance)

| Resource | Capacity |
|----------|----------|
| Concurrent WebSocket connections | ~1,000 |
| Active sessions | ~500 |
| Requests per second | ~200 |
| Background tasks (Celery) | ~50/min |

### Bottlenecks & Solutions

| Bottleneck | Current | Scaled |
|------------|---------|--------|
| WebSocket connections | Single Daphne | Multiple workers + load balancer |
| Database queries | Single PostgreSQL | Read replicas |
| Background tasks | Single Celery worker | Multiple workers |
| External API calls | Sequential | Connection pooling |

---

## Memory Usage

### Docker Container Memory

| Service | Idle | Under Load |
|---------|------|------------|
| PostgreSQL | 100 MB | 300 MB |
| Redis | 50 MB | 100 MB |
| Backend (Django) | 150 MB | 400 MB |
| Frontend (Vite dev) | 200 MB | 300 MB |
| Celery worker | 100 MB | 250 MB |
| Nginx | 10 MB | 20 MB |

### Total System Requirements
- **Minimum**: 4 GB RAM
- **Recommended**: 8 GB RAM

---

## Caching Strategy

### Redis Cache Usage

| Cache Type | TTL | Purpose |
|------------|-----|---------|
| Rate limit counters | 60s | Request throttling |
| Session state | 24h | Quick state recovery |
| User auth tokens | 5min | Token validation |

### Browser Caching

| Asset Type | Cache Duration |
|------------|----------------|
| Static JS/CSS | 1 year (hashed) |
| HTML pages | No cache |
| API responses | No cache |

---

## Monitoring Recommendations

### Metrics to Track

- **Application**: Response times, error rates, active users
- **Database**: Query times, connection pool usage
- **Redis**: Memory usage, hit rate
- **WebSocket**: Connection count, message throughput
- **External APIs**: Latency, error rates, quota usage

### Alerting Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| API response time | > 500ms | > 2s |
| Error rate | > 1% | > 5% |
| Database connections | > 80% | > 95% |
| Memory usage | > 80% | > 95% |
| Celery queue length | > 100 | > 500 |

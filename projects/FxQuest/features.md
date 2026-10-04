# Features

## Feature 1: Multi-Player Interactive Games

### Description
FxQuest provides 8+ fully-featured multiplayer games with turn-based mechanics, real-time state management, and modern Discord UI components. Each game supports multiple concurrent sessions across different servers with persistent game states.

### Why It Matters
- **Engagement**: Keeps members active and interacting in your server
- **Community Building**: Multi-player games encourage social interaction
- **Retention**: Provides reasons for members to return regularly
- **Entertainment**: Offers varied gaming experiences beyond simple bots

### How It Works
1. User initiates a game with a slash command (e.g., `/uno`, `/poker`)
2. Bot creates an interactive game session with Discord UI components
3. Players interact using buttons, select menus, or text inputs
4. Game state is managed in memory with database backup
5. Turn-based mechanics ensure fair gameplay
6. Winners receive economy rewards and stat tracking

### Implementation

#### UNO Game System
```python
# UNO game with Discord Select Menu for card selection
class UnoView(View):
    def __init__(self, bot, game: dict):
        super().__init__(timeout=None)
        self.game = game
        self.players = game["players"]
        # Deck structure: Main deck + player hands
        # Supports Wild, Draw 2, Draw 4, Skip, Reverse
    
    async def updateembed(self):
        # Real-time embed updates showing:
        # - Current player's turn
        # - Current card (color + number)
        # - Player hand counts
        # - Game direction (clockwise/anticlockwise)
        description = f"Current Turn: <@{self.game['current_player']}>\n"
        description += f"Current Card: {self.game['current_color']} {self.game['current_number']}\n"
        # Players can select cards from dropdown menu
        # Color picker for Wild cards
```

#### Poker System with PyPokerEngine
```python
# Texas Hold'em Poker with dedicated channels
class Poker(Cog):
    def __init__(self, bot: MyBot):
        # Uses pypokerengine for hand evaluation
        # Dedicated channel per game (auto-cleanup)
        # Buy-in system with stakes
        
    async def create_game(self, interaction: Interaction, buyin: int):
        # Creates dedicated poker channel
        # Manages betting rounds (Pre-flop, Flop, Turn, River)
        # Fold/Call/Raise mechanics with buttons
        # Pot management and winner determination
```

### Game Features by Type

#### 1. **UNO** (2-4 players)
- Full UNO rules implementation
- Wild cards with color selection
- Action cards (Skip, Reverse, Draw 2/4)
- UNO declaration system
- Turn rotation mechanics

#### 2. **Poker** (2-5 players)
- Texas Hold'em variant
- Professional hand evaluation
- Dedicated game channels
- Buy-in and stakes system
- Complete betting rounds

#### 3. **Blackjack** (Single-player)
- Classic blackjack rules
- Hit/Stand mechanics
- Ace value calculation (1 or 11)
- Betting system integrated with economy
- Dealer AI

#### 4. **Hangman**
- Word guessing with ASCII art
- Visual representation using easy_pil
- Word database integration
- 7 lives system
- Letter tracking

#### 5. **Tic-Tac-Toe** (2 players)
- Interactive button grid (3x3)
- Player invitations (Accept/Deny)
- Win/Tie detection
- Custom emoji support

#### 6. **Bluff (Cheat)** (Multi-player)
- Card game with bluffing mechanics
- Bluff calling system
- Round-based gameplay
- Strategic card passing

#### 7. **Rock Paper Scissors**
- PvP and PvE modes
- Bot opponent with random AI
- Simultaneous move submission
- Win/Loss/Tie resolution

#### 8. **Chat Games** (Automated)
- Word Scramble: Unscramble random words
- Number Guessing: Guess number 1-100
- Automatic timed events (20-60 min intervals)
- First correct answer wins
- Money rewards for winners

---

## Feature 2: Advanced Economy System

### Description
A comprehensive virtual currency system with profile tracking, leaderboards, gambling mechanics, and reward distribution. Each user has a persistent profile storing balance, stats, level progression, and activity metrics.

### Why It Matters
- **Motivation**: Virtual currency incentivizes participation
- **Competition**: Leaderboards encourage active engagement
- **Rewards**: Players earn money through games and activities
- **Progression**: Economic growth ties into leveling system

### How It Works
1. New users start with 1,000 currency
2. Users earn money through:
   - Winning games
   - Leveling up (level × 500 bonus)
   - Chat games (first correct answer)
   - Gambling (risk/reward)
3. Money is spent on:
   - Game entry fees (Poker buy-ins, Blackjack bets)
   - Gambling commands
   - Future shop system (planned)
4. All transactions are tracked in database
5. Profiles display comprehensive stats

### Implementation

```python
# Profile Database Schema
await self.bot.maketable(
    "profile",
    userid="INTEGER",
    guild="INTEGER",
    money="INTEGER",
    moneylost="INTEGER",  # Gambling losses tracked
    level="INTEGER",
    xp="INTEGER",
    messages="INTEGER",
    chatgames="INTEGER"   # Chat games won
)

# Profile Command showing comprehensive stats
@app_commands.command(name="profile")
async def profile(self, interaction: Interaction, user: User = None):
    target = user or interaction.user
    profile = await self.bot.selecttable(
        "profile", 
        userid=target.id, 
        guild=interaction.guild.id
    )
    
    embed = Embed(title=f"{target.display_name}'s Profile")
    embed.add_field(name="💰 Balance", value=f"{profile['money']:,}")
    embed.add_field(name="📊 Level", value=profile['level'])
    embed.add_field(name="⭐ XP", value=f"{profile['xp']:,}")
    embed.add_field(name="💬 Messages", value=f"{profile['messages']:,}")
    embed.add_field(name="🎮 Chat Games Won", value=profile['chatgames'])
    embed.add_field(name="💸 Money Lost", value=f"{profile['moneylost']:,}")
```

### Gambling System

#### Coinflip
- **Bet Range**: 100-5,000
- **Odds**: 50/50
- **Payout**: 2x bet on win
- **Choices**: Heads or Tails
- Server-configurable channels

#### Dice
- **Bet Range**: 100-5,000
- **Odds**: 1/6 for correct guess
- **Payout**: Higher multiplier for correct guess
- **Choices**: 1-6

```python
@gambling.command(name="coinflip")
async def coinflip(self, interaction: Interaction, bet: int, choice: str):
    # Validation: bet limits, channel restrictions, sufficient balance
    if bet < 100 or bet > 5000:
        await interaction.response.send_message("Bet must be 100-5000")
        return
    
    # Random flip
    result = random.choice(["heads", "tails"])
    
    if result == choice:
        # Win: double bet
        await self.bot.updatetable("profile", 2, 
            userid=interaction.user.id,
            guild=interaction.guild.id,
            money=profile['money'] + bet
        )
    else:
        # Lose: deduct bet, track losses
        await self.bot.updatetable("profile", 2,
            userid=interaction.user.id,
            guild=interaction.guild.id,
            money=profile['money'] - bet,
            moneylost=profile['moneylost'] + bet
        )
```

### Leaderboard System
- Top 10 richest users per server
- Real-time ranking
- Displays username, balance, level
- Encourages competition

---

## Feature 3: XP-Based Leveling with Role Rewards

### Description
An automated progression system that rewards active members with XP for each message, levels them up based on a quadratic formula, grants money bonuses, and assigns prestigious roles at milestone levels.

### Why It Matters
- **Recognition**: Long-term members receive visible status
- **Incentive**: Encourages consistent participation
- **Automation**: No manual tracking required
- **Customization**: Server owners configure role rewards

### How It Works
1. User sends a message in server
2. Bot awards 10-20 XP randomly
3. XP accumulates toward next level
4. Level threshold: `5 × level² + 50 × level + 100`
5. On level up:
   - Announcement in configured channel
   - Money bonus: `level × 500`
   - Role reward if milestone reached
6. Admins configure milestone roles (5, 10, 25, 50, 100)

### Implementation

```python
def get_xp(level: int):
    """Calculate XP needed for next level"""
    return 5 * (level**2) + 50 * level + 100

@Cog.listener("on_message")
async def levelupdater(self, message: Message):
    if message.author.bot:
        return
    
    # Get user profile
    profile = await self.bot.selecttable(
        "profile",
        userid=message.author.id,
        guild=message.guild.id
    )
    
    # Award random XP (10-20)
    xp_gain = random.randint(10, 20)
    new_xp = profile['xp'] + xp_gain
    
    # Check level up
    current_level = profile['level']
    xp_needed = get_xp(current_level)
    
    if new_xp >= xp_needed:
        new_level = current_level + 1
        new_xp = 0  # Reset XP for new level
        
        # Money bonus
        money_bonus = new_level * 500
        new_money = profile['money'] + money_bonus
        
        # Update profile
        await self.bot.updatetable("profile", 2,
            userid=message.author.id,
            guild=message.guild.id,
            level=new_level,
            xp=new_xp,
            money=new_money
        )
        
        # Send level up announcement
        guild_config = await self.bot.selecttable("guilds", id=message.guild.id)
        if guild_config['levelchannel']:
            channel = message.guild.get_channel(guild_config['levelchannel'])
            await channel.send(
                f"🎉 {message.author.mention} leveled up to **Level {new_level}**! "
                f"Earned {money_bonus:,} coins!"
            )
        
        # Assign milestone roles
        await self.assign_role_reward(message.author, new_level, guild_config)
```

### Milestone Roles
- **Level 5**: Early achievement role
- **Level 10**: Dedicated member
- **Level 25**: Veteran status
- **Level 50**: Elite member
- **Level 100**: Legendary status

### Configuration Options
- Enable/disable leveling system
- Set level-up announcement channel
- Configure role rewards per milestone
- Per-server customization

---

## Feature 4: Minecraft-Inspired Mining & Inventory System

### Description
A unique Minecraft-style mining system with resource gathering, tool/armor management with durability mechanics, inventory storage, crafting capabilities, and player stats (health, hunger, effects).

### Why It Matters
- **Uniqueness**: Feature not commonly found in Discord bots
- **Depth**: Adds RPG-like progression elements
- **Economy Integration**: Mined resources have value
- **Nostalgia**: Appeals to Minecraft players

### How It Works
1. Players use `/mine` command to gather resources
2. Tool type and durability affect success rate
3. Resources stored in JSON-based inventory
4. Tools/armor have durability that degrades
5. Crafting system combines resources
6. Player stats affect gameplay (health, hunger)
7. Consumables (food, potions) restore stats/add effects

### Implementation

```python
class Item:
    """Base item class with custom emoji support"""
    def __init__(self, name: str):
        self.name = name
        self.emoji = emojis[name]  # Custom server emojis
        self.emojiid = self.emoji[1]
        self.emoji = f"<:{self.emojiname}:{self.emojiid}>"

class Tool(Item):
    """Mining tools with stats and durability"""
    def __init__(self, name: str, durability: int, damage: int, 
                 speed: int, enchantments: dict = {}):
        super().__init__(name)
        self.durability = durability
        self.max_durability = durability
        self.damage = damage
        self.speed = speed
        self.enchantments = enchantments
    
    def use(self):
        """Reduce durability on use"""
        self.durability -= 1
        if self.durability <= 0:
            return "broken"
        return "used"

class Armor(Item):
    """Protective equipment with defense stats"""
    def __init__(self, name: str, durability: int, defense: int, 
                 armor_type: str):
        super().__init__(name)
        self.durability = durability
        self.defense = defense
        self.type = armor_type  # helmet, chestplate, leggings, boots

class Player:
    """Player stats and inventory management"""
    def __init__(self, user_id: int):
        self.user_id = user_id
        self.health = 20
        self.max_health = 20
        self.hunger = 20
        self.max_hunger = 20
        self.effects = {}  # Active potion effects
        self.inventory = {}  # {item_name: quantity}
        self.equipped = {
            "tool": None,
            "helmet": None,
            "chestplate": None,
            "leggings": None,
            "boots": None
        }
```

### Mining System Features
- **Resources**: Coal, Iron, Gold, Diamond, Emerald, Bedrock, etc.
- **Tool Tiers**: Wooden → Stone → Iron → Gold → Diamond
- **Success Rates**: Better tools = higher success rate
- **Durability System**: Tools degrade with use
- **Enchantments**: Future support for tool enhancements

### Inventory Management
- JSON-based storage in database
- Item stacking
- Equipment slots (tool + 4 armor pieces)
- Consumable items (food, potions)
- View inventory with `/inventory` command

### Custom Emoji Integration
```json
// emojis.json - Server-specific emojis for items
{
  "coal": ["coal_emoji", "emoji_id"],
  "iron": ["iron_emoji", "emoji_id"],
  "diamond": ["diamond_emoji", "emoji_id"]
  // Visual representation of items in inventory
}
```

---

## Feature 5: Automated Chat Games with Rewards

### Description
Timed, automatic mini-games that appear in designated channels at random intervals (20-60 minutes), rewarding the first correct answer with virtual currency.

### Why It Matters
- **Passive Engagement**: Games appear without user initiation
- **Rewards Activity**: First responder gets rewarded
- **Variety**: Multiple game types prevent monotony
- **Community Interaction**: Encourages channel activity

### How It Works
1. Bot runs background task loop
2. Every 20-60 minutes (randomized), selects a game type
3. Posts game challenge in configured channel
4. Monitors messages for correct answers
5. First correct answer wins money reward
6. Updates leaderboard stats

### Implementation

```python
class ChatGames(Cog):
    def __init__(self, bot: MyBot):
        self.bot = bot
        self.answer = None
        self.chatgame.start()  # Start background task
    
    @tasks.loop(minutes=random.randint(20, 60))
    async def chatgame(self):
        game = random.choice(["number", "scramble"])
        
        # Get all servers with chat games enabled
        guilds = await self.bot.selectalltable("guilds", chatgames=1)
        
        for guild in guilds:
            channel_id = guild[13]  # Configured channel
            channel = self.bot.get_channel(channel_id)
            
            if game == "number":
                # Number guessing game
                self.answer = random.randint(1, 100)
                await channel.send(embed=Embed(
                    title="🎲 Number Game",
                    description="Guess the number between 1 and 100!",
                    color=discord.Color.random()
                ))
            
            elif game == "scramble":
                # Word scramble game
                words = get_words()  # Word database
                self.answer = random.choice(words)
                scrambled = list(self.answer)
                random.shuffle(scrambled)
                scrambled = "".join(scrambled)
                
                await channel.send(embed=Embed(
                    title="📝 Word Scramble",
                    description=f"Unscramble: **{scrambled}**",
                    color=discord.Color.random()
                ))
    
    @Cog.listener("on_message")
    async def check_answer(self, message: Message):
        # Check if message is in active game channel
        if message.channel.id in self.channels:
            if message.content.lower() == str(self.answer).lower():
                # Winner! Award money
                profile = await self.bot.selecttable(
                    "profile",
                    userid=message.author.id,
                    guild=message.guild.id
                )
                
                reward = 500  # Money reward
                await self.bot.updatetable("profile", 2,
                    userid=message.author.id,
                    guild=message.guild.id,
                    money=profile['money'] + reward,
                    chatgames=profile['chatgames'] + 1
                )
                
                await message.channel.send(
                    f"🎉 {message.author.mention} got it! Earned {reward:,} coins!"
                )
```

### Game Types
1. **Number Guessing**: Guess random number 1-100
2. **Word Scramble**: Unscramble random word from database

### Configuration
- Enable/disable per server
- Set specific channel for games
- Automatic channel selection if not configured
- Leaderboard tracking for chat game wins

---

## Feature 6: Comprehensive Server Customization

### Description
Extensive per-server configuration options allowing administrators to customize every aspect of the bot's functionality, from enabling/disabling features to designating specific channels and setting role rewards.

### Why It Matters
- **Flexibility**: Each server can tailor the bot to their needs
- **Channel Organization**: Keeps bot activity in designated areas
- **Control**: Admins decide which features to enable
- **User Experience**: Customization improves server-specific workflows

### How It Works
1. Admin uses `/setup` command
2. Interactive button/select menu interface appears
3. Configure features through UI:
   - Toggle features on/off
   - Select channels for specific features
   - Assign role rewards
4. Changes saved to database immediately
5. Bot behavior updates in real-time

### Implementation

```python
class SetupView(View):
    """Interactive setup interface with buttons"""
    def __init__(self, bot: Bot, guild: Guild):
        super().__init__(timeout=None)
        self.bot = bot
        self.guild = guild
    
    @button(label="⚙️ Leveling Setup", style=ButtonStyle.primary)
    async def leveling_setup(self, interaction: Interaction, button: Button):
        # Show leveling configuration options
        view = LevelView(self.bot, interaction.user, self.guild)
        await interaction.response.send_message("Configure leveling:", view=view)
    
    @button(label="🎰 Gambling Setup", style=ButtonStyle.primary)
    async def gambling_setup(self, interaction: Interaction, button: Button):
        # Show gambling configuration
        pass
    
    @button(label="🎮 Games Setup", style=ButtonStyle.primary)
    async def games_setup(self, interaction: Interaction, button: Button):
        # Show game channel configuration
        pass

class LevelView(View):
    """Leveling system configuration"""
    
    @button(label="Enable/Disable", style=ButtonStyle.green)
    async def toggle_leveling(self, interaction: Interaction, button: Button):
        current_state = await self.bot.selecttable("guilds", id=self.guild.id)
        new_state = not current_state['level']
        await self.bot.updatetable("guilds", 1,
            id=self.guild.id,
            level=new_state
        )
        await interaction.response.send_message(
            f"Leveling {'enabled' if new_state else 'disabled'}!"
        )
    
    @select(placeholder="Configure Leveling Options...")
    async def level_select(self, interaction: Interaction, select: Select):
        option = select.values[0]
        
        if option == "channel":
            # Set level-up announcement channel
            pass
        elif option == "level5role":
            # Set Level 5 milestone role
            pass
        # ... other milestone roles
```

### Configurable Features

#### Leveling System
- ✅ Enable/Disable
- 📢 Set level-up announcement channel
- 🏅 Configure role rewards (5, 10, 25, 50, 100)

#### Gambling System
- ✅ Enable/Disable
- 💰 Set gambling channel (restrict where gambling works)

#### Chat Games
- ✅ Enable/Disable
- 📝 Set chat games channel

#### Individual Games
- 🃏 UNO channel designation
- ✏️ Hangman channel designation
- ♠️ Poker category for dedicated channels

#### Poker System
- ✅ Enable/Disable poker
- 📁 Set category for poker game channels

### Database Schema for Configuration
```python
await self.bot.maketable(
    "guilds",
    id="INTEGER",                # Guild ID
    level="BOOLEAN",             # Leveling enabled
    levelchannel="INTEGER",      # Level-up channel
    level5role="INTEGER",        # Level 5 role
    level10role="INTEGER",       # Level 10 role
    level25role="INTEGER",       # Level 25 role
    level50role="INTEGER",       # Level 50 role
    level100role="INTEGER",      # Level 100 role
    poker="BOOLEAN",             # Poker enabled
    pokercategory="INTEGER",     # Poker category
    gambling="BOOLEAN",          # Gambling enabled
    gamblingchannel="INTEGER",   # Gambling channel
    uno="BOOLEAN",               # UNO enabled
    unochannel="INTEGER",        # UNO channel
    chatgames="BOOLEAN",         # Chat games enabled
    chatgameschannel="INTEGER",  # Chat games channel
    hangman="BOOLEAN",           # Hangman enabled
    hangmanchannel="INTEGER"     # Hangman channel
)
```

### User-Friendly Interface
- Modern Discord UI (buttons, select menus)
- Real-time updates
- Role/channel mentions in embeds
- Clear confirmation messages
- Persistent views (timeout=None)

---

## Feature 7: Interactive Help System with Command Discovery

### Description
A comprehensive, category-based help system with autocomplete, paginated command listings, detailed command information, and interactive navigation. Users can easily discover and learn about all available bot commands.

### Why It Matters
- **Discoverability**: New users can explore all features
- **Documentation**: Built-in reference for all commands
- **User Experience**: No need for external documentation
- **Accessibility**: Interactive UI makes navigation intuitive

### How It Works
1. User runs `/help` command
2. Bot displays categorized help menu with select dropdown
3. User can:
   - Browse by category (Games, Gambling, Utility, etc.)
   - Search specific command with autocomplete
   - Navigate pages with forward/back buttons
4. Detailed command view shows:
   - Command description
   - Usage syntax
   - Required permissions
   - Category and location (global/guild)

### Implementation

```python
class Help(Cog):
    def __init__(self, bot: MyBot, commands: set[FxQuestCommands]):
        self.bot = bot
        self.commands = commands
    
    @command(name="help", description="Shows this message")
    @app_commands.autocomplete(commandname=commandsautocomplete)
    async def help(self, interaction: Interaction, commandname: str = "None"):
        if commandname != "None":
            # Show specific command details
            for botcommand in self.commands:
                if commandname == botcommand.name:
                    embed = Embed(
                        title=f"Help",
                        description=f"## {command}\n"
                        f"**{command.location}**\n"
                        f"{command.description}\n"
                        f" Usage: `{command.usage}`\n"
                        f"Required Permission: `{command.required_permission}`",
                        color=Color.random(),
                    )
                    await interaction.response.send_message(embed=embed)
                    return
        
        # Show category menu with interactive navigation
        self.helpembed = Embed(
            title="Help Menu",
            description="Select a category to view commands",
            color=Color.random()
        )
        
        # Add category fields
        self.helpembed.add_field(name="Moderator", value="Moderation commands")
        self.helpembed.add_field(name="Games", value="Game commands")
        self.helpembed.add_field(name="Fun", value="Fun commands")
        self.helpembed.add_field(name="Gambling", value="Gambling commands")
        self.helpembed.add_field(name="Utility", value="Utility commands")
        self.helpembed.add_field(name="App", value="Context menu commands")
        self.helpembed.add_field(name="Misc", value="Miscellaneous commands")
        self.helpembed.add_field(name="All", value="All commands")
        
        await interaction.response.send_message(
            embed=self.helpembed, 
            view=self.category_select_view
        )
```

### Features
- **Command Autocomplete**: Type-ahead search for commands
- **Category Organization**: Commands grouped logically
- **Pagination**: Large command lists split into pages
- **Interactive Navigation**: 
  - Forward/back page buttons
  - Jump to first/last page
  - Home button to return to main menu
  - Stop button to close help menu
- **Permission Display**: Shows required permissions for each command
- **Location Indicators**: Global vs guild-specific commands
- **Dynamic Updates**: Help menu reflects currently loaded commands

### Command Categories
1. **Moderator**: Admin/configuration commands
2. **Games**: All game commands (UNO, Poker, etc.)
3. **Fun**: Profile, leaderboards, social features
4. **Gambling**: Coinflip, dice, betting
5. **Utility**: Help, feedback, suggestions
6. **App**: Context menu commands
7. **Misc**: Miscellaneous utilities

---

## Feature 8: User Feedback & Suggestion System

### Description
Built-in feedback system allowing users to submit suggestions, report bugs, and provide general feedback directly through Discord commands. All submissions are forwarded to a dedicated support channel.

### Why It Matters
- **User Voice**: Community can contribute ideas
- **Bug Tracking**: Issues reported directly by users
- **Engagement**: Users feel heard and valued
- **Improvement**: Continuous feedback loop for development

### How It Works
1. User runs feedback command (`/suggest`, `/bug`, or `/feedback`)
2. Provides title and description
3. Bot creates formatted embed with user details
4. Sends to configured support channel
5. User receives confirmation

### Implementation

```python
class FeedBack(Cog):
    def __init__(self, bot: Bot):
        self.bot = bot
    
    @command(name="suggest", description="Suggest Something To The Bot")
    async def suggest(self, interaction: Interaction, title: str, description: str):
        text = "## " + title + "\n" + description
        embed = Embed(
            title="Suggestion", 
            description=text, 
            color=Color.random()
        )
        embed.set_author(
            name=interaction.user, 
            icon_url=interaction.user.avatar.url
        )
        embed.set_footer(text=f"ID: {interaction.user.id}")
        
        # Send to user
        await interaction.response.send_message(embed=embed)
        
        # Forward to support channel
        channel = self.bot.get_guild(SUPPORT_GUILD).get_channel(SUPPORT_CHANNEL)
        await channel.send(embed=embed)
    
    @command(name="bug", description="Report A Bug")
    async def bug(self, interaction: Interaction, title: str, description: str):
        # Similar implementation for bug reports
        pass
    
    @command(name="feedback", description="Give Feedback")
    async def feedback(self, interaction: Interaction, title: str, description: str):
        # Similar implementation for general feedback
        pass
```

### Features
- **Three Command Types**:
  - `/suggest` - Feature suggestions
  - `/bug` - Bug reports
  - `/feedback` - General feedback
- **Rich Embeds**: Professional formatting with user avatar and ID
- **Dual Delivery**: Sent to both user and support channel
- **User Attribution**: Includes user ID for follow-up
- **Categorization**: Separate commands for different feedback types

---

## Feature 9: Advanced Owner Control Panel

### Description
Comprehensive bot administration interface exclusively for the bot owner, providing full control over bot operations including cog management, command syncing, database operations, and live code evaluation.

### Why It Matters
- **Hot Reloading**: Update bot without downtime
- **Debugging**: Live code execution for troubleshooting
- **Management**: Control all bot systems from Discord
- **Monitoring**: View bot statistics and status

### How It Works
1. Bot owner uses `/owner` commands
2. Owner verification checks user ID
3. Access to administrative functions:
   - Load/unload/reload extensions
   - Sync commands globally or per-guild
   - Execute arbitrary Python code
   - Manage help command database
   - Modify user balances
   - Restart bot

### Implementation

```python
def ownercheck(interaction: Interaction):
    """Verify user is bot owner"""
    return interaction.user.id == BOT_OWNER_ID

class Owner(Cog):
    def __init__(self, bot: MyBot, extensions: dict[str, str], cogs: list[str]):
        self.bot = bot
        self.extensions = extensions
        self.cogs = cogs
    
    owner = Group(name="owner", description="Owner Commands")
    
    @owner.command(name="controlpanel", description="Setup the bot")
    @app_commands.check(ownercheck)
    async def controlpanel(self, interaction: Interaction):
        # Display bot statistics
        await self.bot.db.execute("SELECT * FROM helpcommands")
        helpcommands = await self.bot.db.fetchall()
        
        description = f"Total Extensions: {len(self.cogs)}\n"
        description += f"Loaded Extensions: {len(self.bot.extensions)}\n"
        description += f"Total Help Commands: {len(helpcommands)}\n"
        description += f"Total Guilds: {len(self.bot.guilds)}\n"
        description += f"Total Users: {len(self.bot.users)}\n"
        
        embed = Embed(
            title="Control Panel", 
            color=Color.green(), 
            description=description
        )
        
        # Interactive buttons
        view = View()
        view.add_item(Button(label="Load Cog", style=ButtonStyle.green))
        view.add_item(Button(label="Unload Cog", style=ButtonStyle.red))
        view.add_item(Button(label="Reload Cog", style=ButtonStyle.blurple))
        view.add_item(Button(label="Sync Commands", style=ButtonStyle.gray))
        
        await interaction.followup.send(embed=embed, view=view)
    
    @owner.command(name="eval", description="Evaluate code")
    @app_commands.check(ownercheck)
    async def eval(self, interaction: Interaction, code: str):
        """Execute arbitrary Python code"""
        # Safe execution environment
        pass
    
    @owner.command(name="add money", description="Add money to a user")
    @app_commands.check(ownercheck)
    async def add_money(self, interaction: Interaction, user: Member, amount: int):
        """Modify user balance"""
        profile = await self.bot.selecttable("profile", userid=user.id)
        await self.bot.updatetable("profile", 2,
            userid=user.id,
            money=profile['money'] + amount
        )
```

### Owner Commands
- **Extension Management**:
  - `/owner controlpanel` - Interactive control panel
  - Load/unload/reload cogs dynamically
- **Command Syncing**:
  - Sync commands globally
  - Sync to specific guild for testing
- **Code Execution**:
  - `/owner eval` - Run Python code live
  - Access to bot context and database
- **User Management**:
  - `/owner add money` - Modify user balances
  - Direct database access
- **Help System Management**:
  - `/owner add help` - Add custom help entries
  - `/owner add removehelp` - Remove help entries
- **Bot Control**:
  - Restart bot
  - View bot statistics
  - Unload specific commands

### Security Features
- **Owner-only Access**: Strict permission checks
- **Error Handling**: Permission denied messages for unauthorized users
- **Audit Trail**: All actions logged
- **Safe Execution**: Code evaluation in controlled environment

---

## Feature 10: Profile Statistics & Leaderboards

### Description
Comprehensive user profile system tracking stats across all bot features with visual profile cards and server-wide leaderboards for money, level, and activity.

### Why It Matters
- **Progress Visibility**: Users see their achievements
- **Competition**: Leaderboards drive engagement
- **Transparency**: Full stat tracking
- **Motivation**: Visible progression encourages participation

### How It Works
1. All user actions tracked in database
2. `/profile` displays comprehensive stats
3. `/bal top` shows richest users
4. Real-time stat updates
5. Per-server tracking

### Implementation

```python
@app_commands.command(name="profile")
async def profile(self, interaction: Interaction, user: User = None):
    target = user or interaction.user
    profile = await self.bot.selecttable(
        "profile", 
        userid=target.id, 
        guild=interaction.guild.id
    )
    
    embed = Embed(title=f"{target.display_name}'s Profile")
    embed.set_thumbnail(url=target.avatar.url)
    embed.add_field(name="💰 Balance", value=f"{profile['money']:,}")
    embed.add_field(name="📊 Level", value=profile['level'])
    embed.add_field(name="⭐ XP", value=f"{profile['xp']:,}")
    embed.add_field(name="💬 Messages", value=f"{profile['messages']:,}")
    embed.add_field(name="🎮 Chat Games Won", value=profile['chatgames'])
    embed.add_field(name="💸 Money Lost", value=f"{profile['moneylost']:,}")
    
    await interaction.response.send_message(embed=embed)
```

### Tracked Statistics
- **Economy**: Balance, money lost, gambling stats
- **Progression**: Level, XP, messages sent
- **Games**: Chat games won, game participation
- **Activity**: Message count, engagement metrics
- **Achievements**: Milestone tracking (future)

### Leaderboard Features
- **Top 10 Rankings**: Richest users per server
- **Real-time Updates**: Always current
- **Multiple Categories**: Money, level, activity
- **Server-specific**: Per-guild leaderboards
- **Visual Display**: Formatted embeds with emoji medals

---

## Feature 11: Akinator Game Integration (Beta)

### Description
Interactive Akinator game where the bot thinks of a character and asks Yes/No questions to guess who you're thinking of, fully integrated with Discord's button system.

### Why It Matters
- **Unique Feature**: AI-powered guessing game
- **Engagement**: Highly interactive and entertaining
- **Variety**: Different from traditional card/board games
- **AI Integration**: Uses external Akinator API

### How It Works
1. User runs `/akinator`
2. Bot asks a series of Yes/No questions
3. User answers with buttons (Yes/No/Probably/Probably Not/Don't Know)
4. Akinator makes guess based on answers
5. User confirms or denies
6. Can go back to previous questions

### Implementation

```python
class AkinatorView(View):
    def __init__(self, user: User, aki: AsyncAkinator, command):
        super().__init__(timeout=None)
        self.user = user
        self.aki = aki
        self.command = command
        self.questions = 1
        self.isback = False
    
    @button(label="Yes", style=ButtonStyle.green)
    async def yes(self, interaction: Interaction, button: Button):
        await self.aki.answer(Answer.from_str("yes"))
        await self.update(interaction)
    
    @button(label="No", style=ButtonStyle.red)
    async def no(self, interaction: Interaction, button: Button):
        await self.aki.answer(Answer.from_str("no"))
        await self.update(interaction)
    
    @button(label="Back", style=ButtonStyle.gray)
    async def back(self, interaction: Interaction, button: Button):
        try:
            await self.aki.back()
            self.isback = True
            await self.update(interaction)
        except CantGoBackAnyFurther:
            await interaction.response.send_message("Can't go back!", ephemeral=True)

class Akinator(Cog):
    @command(name="akinator", description="Play a game of akinator")
    async def akinator(self, interaction: Interaction):
        aki = AsyncAkinator(child_mode=False, theme=Theme.from_str("characters"))
        first_question = await aki.start_game()
        
        embed = Embed(
            title="Akinator",
            description="1) Question: \n" + first_question,
            color=discord.Color.random()
        )
        await interaction.followup.send(
            embed=embed, 
            view=AkinatorView(interaction.user, aki, self.akinator)
        )
```

### Features
- **Full Akinator API**: Official async implementation
- **Character Theme**: Guesses famous characters
- **Child Mode Option**: Family-friendly mode available
- **Interactive Buttons**: 5 answer options
- **Question Navigation**: Back button to revise answers
- **Win Detection**: Akinator makes final guess
- **Channel Restrictions**: Configurable game channels

### Game Flow
1. Start game with `/akinator`
2. Answer 20-30 questions
3. Akinator guesses character
4. Confirm if correct
5. Continue if wrong
6. Track question count
7. Navigate backwards if needed

---

## Feature 12: Custom Database Abstraction Layer

### Description
A custom-built ORM-like abstraction layer over SQLite providing simplified async database operations with methods for common CRUD operations.

### Why It Matters
- **Developer Experience**: Simplified database queries
- **Type Safety**: Consistent data handling
- **Performance**: Async operations prevent blocking
- **Maintainability**: Centralized database logic
- **Scalability**: Easy to switch to PostgreSQL later

### How It Works
1. Bot initializes with SQLite connection
2. Custom methods abstract raw SQL
3. All operations are async
4. Automatic table creation
5. Simple API for CRUD operations

### Implementation

```python
class MyBot(Bot):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.maindb: sql.Connection
        self.db: sql.Cursor
    
    async def maketable(self, tablename: str, **kwargs):
        """Create table with dynamic columns"""
        columns = ", ".join([f"{k} {v}" for k, v in kwargs.items()])
        await self.db.execute(
            f"CREATE TABLE IF NOT EXISTS {tablename} ({columns})"
        )
        await self.maindb.commit()
    
    async def inserttable(self, tablename: str, *args):
        """Insert row into table"""
        placeholders = ", ".join(["?" for _ in args])
        await self.db.execute(
            f"INSERT INTO {tablename} VALUES ({placeholders})", args
        )
        await self.maindb.commit()
    
    async def selecttable(self, tablename: str, **kwargs):
        """Select single row with conditions"""
        conditions = " AND ".join([f"{k}=?" for k in kwargs.keys()])
        await self.db.execute(
            f"SELECT * FROM {tablename} WHERE {conditions}",
            tuple(kwargs.values())
        )
        result = await self.db.fetchone()
        return dict(zip([desc[0] for desc in self.db.description], result))
    
    async def updatetable(self, tablename: str, mode: int, **kwargs):
        """Update rows (mode: 1=update all, 2=update where conditions)"""
        # Implementation for flexible updates
        pass
    
    async def deletetable(self, tablename: str, **kwargs):
        """Delete rows matching conditions"""
        conditions = " AND ".join([f"{k}=?" for k in kwargs.keys()])
        await self.db.execute(
            f"DELETE FROM {tablename} WHERE {conditions}",
            tuple(kwargs.values())
        )
        await self.maindb.commit()
```

### Custom Methods
- `maketable()`: Create tables dynamically
- `inserttable()`: Insert new records
- `selecttable()`: Query single record
- `selectalltable()`: Query multiple records
- `updatetable()`: Update records (flexible modes)
- `deletetable()`: Delete records
- Returns dict objects for easy access

### Database Tables
- **profile**: User stats (money, level, XP, etc.)
- **guilds**: Server configuration
- **helpcommands**: Dynamic help system
- **poker_games**: Active poker sessions
- **uno_games**: Active UNO sessions
- Per-game state tables as needed

### Benefits
- **Async/Await**: Non-blocking operations
- **Dictionary Returns**: Easy data access (`profile['money']`)
- **Automatic Schema**: Tables created on first use
- **Flexible Queries**: Dynamic WHERE conditions
- **Error Handling**: Built-in validation
- **Connection Pooling**: Single connection reused

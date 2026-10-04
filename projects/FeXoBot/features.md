# FeXoBot - Detailed Features

This document covers ALL major and key features of FeXoBot. The bot includes 100+ commands organized into comprehensive feature categories.

> **Note**: This file documents all 20 major feature categories for complete project understanding. 
> The `metadata.json` file contains only the **6 most important highlight features** (Features 1-6) optimized for portfolio display and quick overview.

---

## Feature 1: Advanced Moderation System

### Description
A comprehensive moderation toolkit providing server administrators with powerful tools to manage their communities effectively. The system includes persistent warning tracking, ban/kick management with reason logging, role-based muting, bulk message deletion, and detailed permission viewing.

### Why It Matters
Maintaining order in active Discord communities requires robust moderation tools. FeXoBot's moderation system stores all actions in a database, allowing administrators to track user behavior over time, make informed decisions, and maintain accountability with logged reasons for all actions.

### How It Works
1. **Warning System**: Administrators use `/warn` to issue warnings, which are stored per-server in SQLite
2. **Database Persistence**: All warnings, bans, and moderation actions are logged with timestamps and reasons
3. **View History**: Use `/warns` to review a user's complete warning history
4. **Clear Records**: Administrators can clear warnings when users improve behavior
5. **Automated Logging**: All moderation actions are logged to designated channels for transparency

### Implementation
```python
# Warning System Implementation
@app_commands.command(name="warn", description="Warn a user")
@app_commands.describe(user="The user to warn", reason="Reason for warning")
@app_commands.checks.has_permissions(manage_messages=True)
async def warn(self, interaction: Interaction, user: Member, reason: str):
    # Connect to server-specific database
    serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
    server = serverdb.cursor()
    
    # Create warnings table if not exists
    server.execute(
        "CREATE TABLE IF NOT EXISTS warnings ("
        "user_id INTEGER, "
        "reason TEXT, "
        "moderator_id INTEGER, "
        "timestamp TIMESTAMP)"
    )
    
    # Insert warning record
    server.execute(
        "INSERT INTO warnings VALUES (?, ?, ?, ?)",
        (user.id, reason, interaction.user.id, timestamp())
    )
    serverdb.commit()
    
    # Send confirmation embed
    embed = Embed(
        title="⚠️ User Warned",
        description=f"{user.mention} has been warned",
        color=Color.orange()
    )
    embed.add_field(name="Reason", value=reason)
    embed.add_field(name="Moderator", value=interaction.user.mention)
    await interaction.response.send_message(embed=embed)
```

---

## Feature 2: Interactive Games System

### Description
Multiple fully-functional games integrated directly into Discord, including Hangman with difficulty levels, multiplayer Tic-Tac-Toe, comprehensive Pokémon database lookup, and trivia with 4,000+ questions across multiple categories.

### Why It Matters
Community engagement is crucial for active Discord servers. Interactive games provide entertainment, encourage member participation, and create opportunities for social interaction - all without leaving Discord.

### How It Works
1. **Hangman**: Bot selects random words from difficulty-categorized lists, displays masked word with button UI for letter guessing
2. **Tic-Tac-Toe**: Creates interactive game board using Discord buttons, tracks player turns, validates moves, detects wins/draws
3. **Pokémon Info**: Queries PokeAPI for comprehensive data, formats responses with stats, abilities, types, and evolution chains
4. **Trivia**: Fetches questions from OpenTDB API, presents multiple-choice options via buttons, tracks scores

### Implementation
```python
# Hangman Game Implementation
class Hangman(View):
    def __init__(self, word: str, difficulty: str, player: Member):
        super().__init__(timeout=180)
        self.word = word.upper()
        self.guessed_letters = set()
        self.wrong_guesses = 0
        self.max_wrong = 6
        self.player = player
        self.difficulty = difficulty
        
        # Create buttons for each letter
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            button = Button(label=letter, style=ButtonStyle.primary)
            button.callback = self.letter_callback
            self.add_item(button)
    
    async def letter_callback(self, interaction: Interaction):
        # Validate player
        if interaction.user.id != self.player.id:
            await interaction.response.send_message(
                "This isn't your game!", ephemeral=True
            )
            return
        
        # Get guessed letter from button
        letter = interaction.data['custom_id']
        
        if letter in self.guessed_letters:
            await interaction.response.send_message(
                "Already guessed!", ephemeral=True
            )
            return
        
        self.guessed_letters.add(letter)
        
        # Check if letter is in word
        if letter not in self.word:
            self.wrong_guesses += 1
        
        # Update display
        display_word = self.get_display_word()
        
        # Check win/loss conditions
        if display_word == self.word:
            await self.win(interaction)
        elif self.wrong_guesses >= self.max_wrong:
            await self.lose(interaction)
        else:
            await self.update_display(interaction, display_word)
```

---

## Feature 3: AI-Powered ChatGPT Integration

### Description
Seamless integration with GPT-4 Free API providing intelligent conversational responses, code explanations, question answering, and natural language processing directly within Discord.

### Why It Matters
AI assistance enhances user experience by providing instant answers to questions, explaining complex topics, generating creative content, and offering coding help - making the bot an intelligent assistant rather than just a command executor.

### How It Works
1. Users invoke `/chatgpt` with their question or prompt
2. Bot sends request to GPT-4 Free API via g4f library
3. Response is streamed back and formatted for Discord
4. Context menu "Explain GPT" option allows right-clicking messages for AI explanations
5. Error handling ensures graceful fallbacks if API is unavailable

### Implementation
```python
# ChatGPT Integration
@app_commands.command(name="chatgpt", description="Ask ChatGPT a question")
@app_commands.describe(message="Your question or prompt")
async def chatgpt(self, interaction: Interaction, message: str):
    await interaction.response.defer()
    
    try:
        # Send request to GPT-4 Free API
        response = await asyncio.to_thread(
            gpt.ChatCompletion.create,
            model="gpt-4",
            messages=[{"role": "user", "content": message}]
        )
        
        # Extract response text
        answer = response.choices[0].message.content
        
        # Format response in embed
        embed = Embed(
            title="🤖 ChatGPT Response",
            description=answer[:4000],  # Discord limit
            color=Color.blue()
        )
        embed.set_footer(text=f"Asked by {interaction.user.name}")
        
        await interaction.followup.send(embed=embed)
        
    except Exception as e:
        # Error handling
        await interaction.followup.send(
            "❌ ChatGPT is currently unavailable. Please try again later.",
            ephemeral=True
        )
```

---

## Feature 4: 12+ External API Integrations

### Description
Extensive integration with third-party APIs providing access to space data (NASA), Pokémon information (PokeAPI), jokes (JokeAPI), facts and quotes (NinjaAPI), translation (Google Translate), currency conversion, weather data, recipes, temporary emails, and more.

### Why It Matters
API integrations transform the bot from a simple utility into a gateway for rich, real-time external data. Users can access diverse information sources without leaving Discord, making the server a comprehensive information hub.

### How It Works
1. **NASA APOD**: Fetches daily Astronomy Picture of the Day with HD images and descriptions
2. **PokeAPI**: Retrieves comprehensive Pokémon data including stats, abilities, types, moves, and evolution chains
3. **Translation**: Uses Google Translate API for multi-language text translation
4. **Currency**: Real-time exchange rates for global currency conversion
5. **Jokes/Facts**: Random jokes categorized by type and interesting facts on-demand
6. **Weather**: Current conditions and forecasts for any location

### Implementation
```python
# NASA APOD Integration
@app_commands.command(name="nasa", description="Get NASA's Astronomy Picture of the Day")
async def nasa_apod(self, interaction: Interaction):
    await interaction.response.defer()
    
    try:
        # Fetch from NASA API
        url = f"https://api.nasa.gov/planetary/apod?api_key={nasaapikey}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
        
        # Create embed with image and description
        embed = Embed(
            title=f"🌌 {data['title']}",
            description=data['explanation'],
            color=Color.dark_blue()
        )
        embed.set_image(url=data['hdurl'])
        embed.add_field(name="Date", value=data['date'])
        
        if 'copyright' in data:
            embed.set_footer(text=f"Copyright: {data['copyright']}")
        
        await interaction.followup.send(embed=embed)
        
    except Exception as e:
        await interaction.followup.send(
            "❌ Failed to fetch NASA APOD", ephemeral=True
        )

# PokeAPI Integration Example
@app_commands.command(name="pokemon", description="Get Pokémon information")
@app_commands.describe(name="Pokémon name")
async def pokemon_info(self, interaction: Interaction, name: str):
    await interaction.response.defer()
    
    try:
        # Query PokeAPI
        url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
        
        # Format stats
        stats = "\n".join([
            f"**{stat['stat']['name'].title()}**: {stat['base_stat']}"
            for stat in data['stats']
        ])
        
        # Get types
        types = ", ".join([t['type']['name'].title() for t in data['types']])
        
        # Create embed
        embed = Embed(
            title=f"#{data['id']} - {data['name'].title()}",
            color=Color.red()
        )
        embed.set_thumbnail(url=data['sprites']['front_default'])
        embed.add_field(name="Types", value=types, inline=False)
        embed.add_field(name="Stats", value=stats, inline=False)
        embed.add_field(name="Height", value=f"{data['height']/10}m")
        embed.add_field(name="Weight", value=f"{data['weight']/10}kg")
        
        await interaction.followup.send(embed=embed)
        
    except:
        await interaction.followup.send(
            f"❌ Pokémon '{name}' not found!", ephemeral=True
        )
```

---

## Feature 5: Automated Leveling System

### Description
Sophisticated XP and leveling system that tracks user activity, awards experience points for messages, calculates levels with progressive requirements, and automatically assigns role rewards at milestones (levels 5, 10, 25, 50, 100).

### Why It Matters
Gamification through leveling systems significantly increases user engagement and encourages active participation. Role rewards provide tangible recognition for active members, creating motivation to contribute to the community.

### How It Works
1. **Message Tracking**: Event listener captures all messages, awards 15-25 random XP per message
2. **Cooldown System**: 60-second cooldown prevents spam abuse
3. **Level Calculation**: XP thresholds increase exponentially (100, 250, 500, 1000, etc.)
4. **Auto Role Assignment**: Bot automatically assigns configured roles when users reach milestone levels
5. **Beautiful Level Cards**: Custom-generated images using Easy-PIL showing progress bars and stats
6. **Leaderboards**: Server-wide ranking system displaying top members

### Implementation
```python
# Leveling System Implementation
@Cog.listener()
async def on_message(self, message: Message):
    if message.author.bot:
        return
    
    # Get server database
    serverdb = sql.connect(f"servers/{message.guild.id}.db")
    server = serverdb.cursor()
    
    # Check if leveling is enabled
    db.execute("SELECT levels FROM guild WHERE guild_id = ?", (message.guild.id,))
    if not db.fetchone()[0]:
        return
    
    # Check cooldown
    current_time = time.time()
    if message.author.id in self.cooldowns:
        if current_time - self.cooldowns[message.author.id] < 60:
            return
    
    # Award XP
    xp_gain = random.randint(15, 25)
    
    # Get current stats
    server.execute(
        "SELECT xp, level FROM levels WHERE user_id = ?",
        (message.author.id,)
    )
    result = server.fetchone()
    
    if result:
        current_xp, current_level = result
        new_xp = current_xp + xp_gain
        
        # Calculate XP needed for next level
        xp_needed = 100 * (current_level ** 2)
        
        if new_xp >= xp_needed:
            # Level up!
            new_level = current_level + 1
            server.execute(
                "UPDATE levels SET xp = ?, level = ? WHERE user_id = ?",
                (new_xp, new_level, message.author.id)
            )
            
            # Check for role rewards
            await self.assign_level_role(message.author, new_level, message.guild)
            
            # Send level up message
            await self.send_level_up(message.channel, message.author, new_level)
        else:
            # Update XP
            server.execute(
                "UPDATE levels SET xp = ? WHERE user_id = ?",
                (new_xp, message.author.id)
            )
    else:
        # New user
        server.execute(
            "INSERT INTO levels VALUES (?, ?, ?)",
            (message.author.id, xp_gain, 1)
        )
    
    serverdb.commit()
    self.cooldowns[message.author.id] = current_time

# Generate Level Card
@app_commands.command(name="level", description="View your level card")
async def level_card(self, interaction: Interaction, user: Optional[Member] = None):
    target = user or interaction.user
    
    # Get stats from database
    serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
    server = serverdb.cursor()
    server.execute(
        "SELECT xp, level FROM levels WHERE user_id = ?",
        (target.id,)
    )
    result = server.fetchone()
    
    if not result:
        await interaction.response.send_message(
            "No level data found!", ephemeral=True
        )
        return
    
    xp, level = result
    
    # Calculate progress
    xp_needed = 100 * (level ** 2)
    progress = (xp / xp_needed) * 100
    
    # Generate card image using Easy-PIL
    background = Editor(Canvas((800, 300), color="#2f3136"))
    profile_pic = await load_image_async(str(target.avatar.url))
    profile = Editor(profile_pic).resize((150, 150)).circle_image()
    
    # Add elements to card
    background.paste(profile, (25, 75))
    background.text((200, 50), target.name, font=pil.Font.poppins(size=40), color="white")
    background.text((200, 120), f"Level {level}", font=pil.Font.poppins(size=30), color="#5865f2")
    background.rectangle((200, 180), width=550, height=40, fill="#484b51", radius=20)
    background.rectangle((200, 180), width=int(550 * (progress/100)), height=40, fill="#5865f2", radius=20)
    background.text((750, 190), f"{xp}/{xp_needed} XP", font=pil.Font.poppins(size=20), color="white", align="right")
    
    file = File(fp=background.image_bytes, filename="level_card.png")
    await interaction.response.send_message(file=file)
```

---

## Feature 6: Complete Support Ticket System

### Description
Full-featured support ticket system with button-based ticket creation, category organization, staff role notifications, complete ticket transcripts, and proper ticket lifecycle management (open, close, archive).

### Why It Matters
Efficient support systems are critical for community management. A dedicated ticket system ensures private communication channels for sensitive issues, organizes support requests, maintains conversation history, and allows staff to manage workload effectively.

### How It Works
1. **Ticket Creation**: Users click a button or use `/ticket` command to create a support ticket
2. **Private Channel**: Bot creates a private text channel accessible only to the user and staff
3. **Staff Notification**: Designated support roles are mentioned in the ticket
4. **Transcript Generation**: When closed, full conversation is saved as a text file
5. **Category Management**: Tickets are organized in configured categories for better structure
6. **Ticket Numbers**: Sequential numbering system tracks all tickets per server

### Implementation
```python
# Ticket System Implementation
class TicketButton(View):
    def __init__(self):
        super().__init__(timeout=None)
    
    @button(label="📩 Create Ticket", style=ButtonStyle.green, custom_id="create_ticket")
    async def create_ticket(self, interaction: Interaction, button: Button):
        await self.create_ticket_channel(interaction)
    
    async def create_ticket_channel(self, interaction: Interaction, reason: str = "No reason provided"):
        # Get server configuration
        db.execute(
            "SELECT ticketcategory, ticketrole FROM guild WHERE guild_id = ?",
            (interaction.guild.id,)
        )
        category_id, role_id = db.fetchone()
        
        # Get ticket number
        serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
        server = serverdb.cursor()
        server.execute("SELECT COUNT(*) FROM tickets")
        ticket_number = server.fetchone()[0] + 1
        
        # Create ticket channel
        category = interaction.guild.get_channel(category_id)
        support_role = interaction.guild.get_role(role_id)
        
        overwrites = {
            interaction.guild.default_role: discord.PermissionOverwrite(read_messages=False),
            interaction.user: discord.PermissionOverwrite(read_messages=True, send_messages=True),
            support_role: discord.PermissionOverwrite(read_messages=True, send_messages=True),
            interaction.guild.me: discord.PermissionOverwrite(read_messages=True, send_messages=True)
        }
        
        channel = await interaction.guild.create_text_channel(
            name=f"ticket-{ticket_number}",
            category=category,
            overwrites=overwrites
        )
        
        # Store ticket data
        server.execute(
            "INSERT INTO tickets VALUES (?, ?, ?, ?, ?)",
            (ticket_number, interaction.user.id, channel.id, timestamp(), "open")
        )
        serverdb.commit()
        
        # Send ticket welcome message
        embed = Embed(
            title=f"🎫 Ticket #{ticket_number}",
            description=f"**Created by**: {interaction.user.mention}\n**Reason**: {reason}\n\nSupport will be with you shortly!",
            color=Color.green()
        )
        
        # Add close button
        close_view = View(timeout=None)
        close_button = Button(label="🔒 Close Ticket", style=ButtonStyle.red, custom_id=f"close_{ticket_number}")
        close_button.callback = self.close_ticket_callback
        close_view.add_item(close_button)
        
        await channel.send(f"{interaction.user.mention} {support_role.mention}", embed=embed, view=close_view)
        await interaction.response.send_message(
            f"✅ Ticket created: {channel.mention}", ephemeral=True
        )
    
    async def close_ticket_callback(self, interaction: Interaction):
        # Generate transcript
        messages = []
        async for message in interaction.channel.history(limit=None, oldest_first=True):
            timestamp = message.created_at.strftime("%Y-%m-%d %H:%M:%S")
            messages.append(f"[{timestamp}] {message.author}: {message.content}")
        
        # Save transcript
        ticket_id = interaction.channel.name.split("-")[1]
        transcript_path = f"tickets/{ticket_id}-{interaction.guild.id}.txt"
        
        async with aiofiles.open(transcript_path, "w", encoding="utf-8") as f:
            await f.write("\n".join(messages))
        
        # Update database
        serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
        server = serverdb.cursor()
        server.execute(
            "UPDATE tickets SET status = ? WHERE channel_id = ?",
            ("closed", interaction.channel.id)
        )
        serverdb.commit()
        
        # Send transcript to user
        await interaction.response.send_message(
            "📄 Generating transcript and closing ticket...",
            file=File(transcript_path)
        )
        
        # Delete channel after delay
        await asyncio.sleep(5)
        await interaction.channel.delete()
```

---

## Feature 7: Advanced Mathematics & Calculator

### Description
A comprehensive mathematical toolkit featuring an interactive GUI calculator directly in Discord, equation solving capabilities, advanced functions (power, root, factorial), geometry calculators, statistics functions, and support for complex mathematical expressions.

### Why It Matters
Many students and professionals need quick mathematical computations. Having a full-featured calculator and math solver integrated into Discord eliminates the need to switch applications, making it perfect for study groups, homework help servers, and professional channels.

### How It Works
1. **Interactive Calculator**: Use `/calc` to launch a button-based calculator interface
2. **Expression Evaluation**: Custom math interpreter parses complex expressions with order of operations
3. **Advanced Functions**: Support for exponents (^), factorials (!), square roots, and more
4. **Equation Solving**: Solve quadratic equations with step-by-step solutions
5. **Geometry Tools**: Calculate area/volume for circles, rectangles, triangles, spheres, cubes
6. **Statistics**: Compute mean, median, mode from datasets

### Implementation
```python
# Custom Math Interpreter with Error Handling
from mathinterpreter import Error as MathEvalError, run as matheval, MathError

class Calculator(View):
    def __init__(self, interaction: Interaction, user, equation: str = ""):
        super().__init__(timeout=None)
        self.interaction = interaction
        self.user = user
        self.equation = equation
        self.answer = ""
        
        # Create buttons for digits and operations
        for letter in "789/456x123-0.+^()":
            button = Button(label=letter, style=self.get_style(letter))
            button.callback = self.button_callback
            self.add_item(button)
        
        # Add special buttons
        self.add_item(Button(label="=", style=ButtonStyle.success))
        self.add_item(Button(label="⌫", style=ButtonStyle.danger))
        self.add_item(Button(label="C", style=ButtonStyle.danger))
    
    async def button_callback(self, interaction: Interaction):
        if interaction.user.id != self.user.id:
            return await interaction.response.send_message(
                "This isn't your calculator!", ephemeral=True
            )
        
        button_value = interaction.data['custom_id']
        
        if button_value == "=":
            # Evaluate expression using custom interpreter
            try:
                result, error = matheval("<calc>", self.equation)
                if error:
                    self.answer = f"Error: {error.as_string()}"
                else:
                    self.answer = str(result)
            except Exception as e:
                self.answer = f"Syntax Error"
        elif button_value == "C":
            self.equation = ""
            self.answer = ""
        elif button_value == "⌫":
            self.equation = self.equation[:-1]
        else:
            self.equation += button_value
        
        # Update display
        embed = interaction.message.embeds[0]
        embed.description = f"```\n{self.equation}\n{self.answer}```"
        await interaction.response.edit_message(embed=embed, view=self)

# Quadratic Equation Solver
@app_commands.command(name="quadratic", description="Solve quadratic equations")
async def quadratic(self, interaction: Interaction, a: float, b: float, c: float):
    discriminant = b**2 - 4*a*c
    
    if discriminant > 0:
        x1 = (-b + discriminant**0.5) / (2*a)
        x2 = (-b - discriminant**0.5) / (2*a)
        solution = f"Two real solutions:\nx₁ = {x1:.4f}\nx₂ = {x2:.4f}"
    elif discriminant == 0:
        x = -b / (2*a)
        solution = f"One real solution:\nx = {x:.4f}"
    else:
        real = -b / (2*a)
        imag = (abs(discriminant)**0.5) / (2*a)
        solution = f"Complex solutions:\nx₁ = {real:.4f} + {imag:.4f}i\nx₂ = {real:.4f} - {imag:.4f}i"
    
    embed = Embed(title="Quadratic Solver", description=f"**Equation**: {a}x² + {b}x + {c} = 0\n\n**Solution**:\n{solution}")
    await interaction.response.send_message(embed=embed)
```

---

## Feature 8: Interactive Polls & Voting System

### Description
Create engaging polls with up to 4 options, real-time vote tracking, and automatic results calculation. Polls feature emoji reactions for voting, anti-cheat measures to prevent double-voting, and beautiful embed displays with live vote counts.

### Why It Matters
Community engagement and decision-making are crucial for active Discord servers. The poll system enables democratic voting on server decisions, gathering member opinions, and creating interactive content that encourages participation.

### How It Works
1. **Poll Creation**: Use `/poll` with question and 2-4 options
2. **Vote Tracking**: Each vote is stored with user ID to prevent duplicates
3. **Real-Time Updates**: Embed automatically updates with current vote counts and percentages
4. **Results Display**: Visual percentage bars show voting distribution
5. **Cooldown System**: Prevents poll spam with per-user cooldowns

### Implementation
```python
@command(name="poll", description="Create a Poll for users to vote")
async def poll(self, interaction: Interaction, question: str, option1: str, option2: str, 
               option3: Optional[str] = "None", option4: Optional[str] = "None"):
    # Anti-spam check
    if interaction.user.id in poll_cooldowns:
        return await interaction.response.send_message(
            embed=error_embed("You Are On Cooldown"), ephemeral=True
        )
    
    # Create poll embed
    embed = Embed(
        title="📊 Poll",
        description=f"**{question}**\n\n"
                    f"1️⃣ {option1}\n"
                    f"2️⃣ {option2}\n"
                    f"3️⃣ {option3}\n"
                    f"4️⃣ {option4}",
        color=Color.blue()
    )
    embed.set_footer(text=f"Poll Created By {interaction.user.name}")
    
    # Create voting buttons
    view = View(timeout=None)
    for i, option in enumerate([option1, option2, option3, option4], 1):
        if option != "None":
            button = Button(label=f"Vote {i}", emoji=f"{i}️⃣", style=ButtonStyle.primary)
            button.callback = lambda inter, opt=i: vote_callback(inter, opt)
            view.add_item(button)
    
    message = await interaction.channel.send(embed=embed, view=view)
    
    # Store poll data
    poll_data[message.id] = {
        'question': question,
        'options': [option1, option2, option3, option4],
        'votes': {1: 0, 2: 0, 3: 0, 4: 0},
        'voters': [],
        'creator': interaction.user.id
    }
    
    await interaction.response.send_message("✅ Poll created!", ephemeral=True)
```

---

## Feature 9: Custom Embed Builder

### Description
A powerful visual embed creation system with interactive modals for designing beautiful, customizable Discord embeds. Features include title/description editing, color selection, image/thumbnail attachments, field management, footer customization, and template saving.

### Why It Matters
Eye-catching announcements and messages improve server aesthetics and user engagement. The embed builder eliminates the need for external tools or complex JSON formatting, making professional-looking embeds accessible to all server staff.

### How It Works
1. **Modal Interface**: Use `/embed` to open interactive forms for each embed component
2. **Component Editing**: Separate modals for title, fields, images, footer, color
3. **Live Preview**: Changes appear instantly in the embed
4. **Template System**: Save frequently-used embed layouts
5. **Color Picker**: Support for hex codes and named colors

### Implementation
```python
class EmbedBuilder(View):
    def __init__(self, message: Message):
        super().__init__(timeout=None)
        self.message = message
    
    @button(label="📝 Title/Description", style=ButtonStyle.primary)
    async def edit_title(self, interaction: Interaction, button: Button):
        modal = TitleDescriptionModal(self.message)
        await interaction.response.send_modal(modal)
    
    @button(label="🎨 Color", style=ButtonStyle.primary)
    async def edit_color(self, interaction: Interaction, button: Button):
        modal = ColorModal(self.message)
        await interaction.response.send_modal(modal)
    
    @button(label="🖼️ Image", style=ButtonStyle.primary)
    async def edit_image(self, interaction: Interaction, button: Button):
        modal = ImageModal(self.message)
        await interaction.response.send_modal(modal)

class TitleDescriptionModal(Modal):
    def __init__(self, message: Message):
        super().__init__(title="Edit Embed Title/Description")
        self.message = message
    
    title_input = TextInput(
        label="Title",
        placeholder="Enter embed title",
        max_length=256,
        required=True
    )
    
    description_input = TextInput(
        label="Description",
        placeholder="Enter description",
        max_length=4000,
        style=TextStyle.paragraph,
        required=False
    )
    
    url_input = TextInput(
        label="URL (optional)",
        placeholder="https://example.com",
        required=False
    )
    
    async def on_submit(self, interaction: Interaction):
        embed = self.message.embeds[0]
        embed.title = self.title_input.value
        embed.description = self.description_input.value
        embed.url = self.url_input.value if self.url_input.value else None
        
        await self.message.edit(embed=embed)
        await interaction.response.send_message("✅ Embed updated!", ephemeral=True)
```

---

## Feature 10: Giveaway System

### Description
Host automated giveaways with timed duration, multiple winner selection, entry tracking, and automatic winner announcement. Includes features like minimum server activity requirements, entry validation, and full giveaway management (edit, end early, reroll).

### Why It Matters
Giveaways boost server activity, reward loyal members, and create excitement in the community. The automated system handles all entry tracking and winner selection fairly, removing manual work and bias from the process.

### How It Works
1. **Creation**: Use `/giveaway` with prize, duration, and winner count
2. **Entry System**: Users click a button to enter, entries stored in database
3. **Validation**: Check for duplicate entries and minimum requirements
4. **Automatic End**: Timer-based system concludes giveaway at specified time
5. **Winner Selection**: Random selection from entries pool, with reroll option

### Implementation
```python
@command(name="giveaway", description="Start a giveaway")
@has_permissions(manage_guild=True)
async def giveaway(self, interaction: Interaction, prize: str, duration: str, 
                   winners: int = 1):
    # Parse duration (e.g., "10m", "2h", "1d")
    time_units = {'s': 1, 'm': 60, 'h': 3600, 'd': 86400}
    duration_seconds = int(duration[:-1]) * time_units[duration[-1]]
    end_time = time.time() + duration_seconds
    
    # Create giveaway embed
    embed = Embed(
        title="🎉 GIVEAWAY 🎉",
        description=f"**Prize**: {prize}\n"
                    f"**Winners**: {winners}\n"
                    f"**Ends**: <t:{int(end_time)}:R>",
        color=Color.gold()
    )
    embed.set_footer(text=f"Hosted by {interaction.user.name}")
    
    # Create entry button
    view = View(timeout=None)
    enter_button = Button(label="🎁 Enter Giveaway", style=ButtonStyle.success)
    enter_button.callback = giveaway_entry_callback
    view.add_item(enter_button)
    
    message = await interaction.channel.send(embed=embed, view=view)
    
    # Store in database
    db.execute(
        "INSERT INTO giveaways VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        (interaction.guild.id, interaction.channel.id, interaction.user.id,
         message.id, prize, winners, '[]', int(end_time))
    )
    db.commit()
    
    await interaction.response.send_message("✅ Giveaway started!", ephemeral=True)
    
    # Schedule giveaway end
    await asyncio.sleep(duration_seconds)
    await end_giveaway(message.id, interaction.guild)

async def end_giveaway(message_id: int, guild: Guild):
    # Fetch giveaway data
    db.execute("SELECT * FROM giveaways WHERE message_id = ?", (message_id,))
    data = db.fetchone()
    
    entries = json.loads(data[6])
    winner_count = data[5]
    
    if len(entries) < winner_count:
        winners = entries
    else:
        winners = random.sample(entries, winner_count)
    
    # Announce winners
    channel = guild.get_channel(data[1])
    message = await channel.fetch_message(message_id)
    
    winner_mentions = " ".join([f"<@{uid}>" for uid in winners])
    await message.reply(f"🎊 **GIVEAWAY ENDED** 🎊\n**Winners**: {winner_mentions}")
```

---

## Feature 11: Reaction Roles System

### Description
Allow members to self-assign roles by reacting to messages. Supports multiple role options per message, emoji customization, role limits, and automatic role removal when reactions are removed.

### Why It Matters
Manual role assignment is tedious for moderators. Reaction roles empower members to customize their server experience (color roles, notification preferences, game roles) independently, reducing admin workload.

### How It Works
1. **Setup**: Admins use `/reactionrole setup` to configure a message
2. **Role Mapping**: Link specific emojis to specific roles
3. **Auto-Assignment**: Bot monitors reactions and assigns roles instantly
4. **Removal Handling**: Removing reaction removes the role
5. **Persistent Storage**: Survives bot restarts via database

### Implementation
```python
@command(name="reactionrole", description="Setup reaction roles")
@has_permissions(manage_roles=True)
async def reactionrole(self, interaction: Interaction, message_id: str, 
                       emoji: str, role: Role):
    # Store reaction role mapping
    serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
    server = serverdb.cursor()
    
    server.execute(
        "CREATE TABLE IF NOT EXISTS reaction_roles ("
        "message_id INTEGER, emoji TEXT, role_id INTEGER)"
    )
    
    server.execute(
        "INSERT INTO reaction_roles VALUES (?, ?, ?)",
        (int(message_id), emoji, role.id)
    )
    serverdb.commit()
    
    # Add reaction to message
    try:
        channel = interaction.channel
        message = await channel.fetch_message(int(message_id))
        await message.add_reaction(emoji)
        await interaction.response.send_message(
            f"✅ Reaction role set: {emoji} → {role.mention}", ephemeral=True
        )
    except:
        await interaction.response.send_message("❌ Message not found", ephemeral=True)

# Event listener
@commands.Cog.listener()
async def on_raw_reaction_add(self, payload: RawReactionActionEvent):
    # Fetch reaction role mapping
    serverdb = sql.connect(f"servers/{payload.guild_id}.db")
    server = serverdb.cursor()
    
    server.execute(
        "SELECT role_id FROM reaction_roles WHERE message_id = ? AND emoji = ?",
        (payload.message_id, str(payload.emoji))
    )
    
    result = server.fetchone()
    if result:
        guild = self.bot.get_guild(payload.guild_id)
        role = guild.get_role(result[0])
        member = guild.get_member(payload.user_id)
        
        if member and role:
            await member.add_roles(role)
```

---

## Feature 12: Translation & Multi-Language Support

### Description
Real-time text translation supporting 100+ languages powered by Google Translate API. Features include auto-detection of source language, language code autocomplete, and support for translating message content by reply reference.

### Why It Matters
Global Discord communities have members speaking different languages. The translation feature breaks language barriers, enabling cross-cultural communication and making servers accessible to international audiences.

### How It Works
1. **Command Usage**: `/translate [text] [target_language]` or `/translate [target_lang]` (reply to message)
2. **Auto-Detection**: Automatically detects source language
3. **Language Autocomplete**: Search languages by name or code
4. **Instant Translation**: Returns translated text in embed format
5. **Preserves Formatting**: Maintains text structure and special characters

### Implementation
```python
import translators as ts

@command(name="translate", description="Translate text to another language")
async def translate(self, interaction: Interaction, text: str = None, 
                   target_language: str = "en"):
    # If replying to a message
    if text is None and interaction.message.reference:
        referenced = await interaction.channel.fetch_message(
            interaction.message.reference.message_id
        )
        text = referenced.content
    
    if not text:
        return await interaction.response.send_message(
            "❌ Provide text or reply to a message", ephemeral=True
        )
    
    try:
        # Translate using Google Translate
        translated = ts.translate_text(
            text,
            translator='google',
            to_language=target_language
        )
        
        # Detect source language
        detected = ts.translate_text(text, translator='google', to_language='en')
        
        embed = Embed(title="🌐 Translation", color=Color.blue())
        embed.add_field(name="Original", value=text[:1024], inline=False)
        embed.add_field(name=f"Translated ({target_language})", 
                       value=translated[:1024], inline=False)
        
        await interaction.response.send_message(embed=embed)
    
    except Exception as e:
        await interaction.response.send_message(
            f"❌ Translation failed: {str(e)}", ephemeral=True
        )
```

---

## Feature 13: Welcome System with Custom Images

### Description
Greet new members with personalized welcome messages and auto-generated welcome cards featuring user avatars, server information, and customizable backgrounds using Easy-PIL for image generation.

### Why It Matters
First impressions matter. Welcoming new members makes them feel valued and increases retention. Custom welcome images with server branding create a professional, polished onboarding experience.

### How It Works
1. **Auto-Detection**: Triggers when new members join
2. **Image Generation**: Creates custom card with user avatar, name, member count
3. **Database Config**: Server-specific welcome channel and message settings
4. **Role Assignment**: Optional auto-role for new members
5. **Customizable**: Admins can set welcome message templates

### Implementation
```python
from easy_pil import Editor, Canvas, Font, load_image_async

@commands.Cog.listener()
async def on_member_join(self, member: Member):
    # Load server settings
    serverdb = sql.connect(f"servers/{member.guild.id}.db")
    server = serverdb.cursor()
    
    server.execute("SELECT welcome_channel, welcome_message FROM settings")
    settings = server.fetchone()
    
    if not settings:
        return
    
    channel_id, message_template = settings
    channel = member.guild.get_channel(channel_id)
    
    # Generate welcome image
    background = Editor(Canvas((900, 300), color="#23272A"))
    profile_image = await load_image_async(str(member.avatar.url))
    profile = Editor(profile_image).resize((200, 200)).circle_image()
    
    font_large = Font.poppins(size=50)
    font_small = Font.poppins(size=30)
    
    background.paste(profile, (50, 50))
    background.text((300, 100), f"Welcome {member.name}!", font=font_large, color="#FFFFFF")
    background.text((300, 180), f"Member #{member.guild.member_count}", 
                   font=font_small, color="#888888")
    
    file = File(fp=background.image_bytes, filename="welcome.png")
    
    # Send welcome message
    message = message_template.replace("{user}", member.mention)
    message = message.replace("{server}", member.guild.name)
    message = message.replace("{count}", str(member.guild.member_count))
    
    await channel.send(message, file=file)
```

---

## Feature 14: Message & Event Logging

### Description
Comprehensive logging system that tracks all server activity including message edits/deletes, member joins/leaves, role changes, channel modifications, and command usage with timestamps and detailed context.

### Why It Matters
Server security and moderation require activity tracking. Logs provide evidence for rule enforcement, help identify problematic users, track deleted messages, and maintain accountability across the server.

### How It Works
1. **Event Monitoring**: Listens to Discord.py events (on_message_delete, on_message_edit, etc.)
2. **Database Storage**: Stores logs in SQLite with full context
3. **File Backup**: Saves message history to text files
4. **Designated Channel**: Sends log embeds to configured log channel
5. **Searchable**: Query logs by user, date, or event type

### Implementation
```python
@commands.Cog.listener()
async def on_message_delete(self, message: Message):
    if message.author.bot:
        return
    
    # Save to file
    log_file = f"messagelogfiles/{message.guild.id}-{message.channel.id}.txt"
    async with aiofiles.open(log_file, "a", encoding="utf-8") as f:
        await f.write(
            f"[DELETED {datetime.now()}] {message.author}: {message.content}\n"
        )
    
    # Send to log channel
    serverdb = sql.connect(f"servers/{message.guild.id}.db")
    server = serverdb.cursor()
    server.execute("SELECT log_channel FROM settings")
    result = server.fetchone()
    
    if result:
        log_channel = message.guild.get_channel(result[0])
        embed = Embed(
            title="🗑️ Message Deleted",
            color=Color.red(),
            timestamp=datetime.utcnow()
        )
        embed.add_field(name="Author", value=message.author.mention)
        embed.add_field(name="Channel", value=message.channel.mention)
        embed.add_field(name="Content", value=message.content[:1024], inline=False)
        
        await log_channel.send(embed=embed)

@commands.Cog.listener()
async def on_message_edit(self, before: Message, after: Message):
    if before.content == after.content or before.author.bot:
        return
    
    # Save edit log
    serverdb = sql.connect(f"servers/{before.guild.id}.db")
    server = serverdb.cursor()
    server.execute("SELECT log_channel FROM settings")
    result = server.fetchone()
    
    if result:
        log_channel = before.guild.get_channel(result[0])
        embed = Embed(
            title="✏️ Message Edited",
            color=Color.orange(),
            timestamp=datetime.utcnow()
        )
        embed.add_field(name="Author", value=before.author.mention)
        embed.add_field(name="Channel", value=before.channel.mention)
        embed.add_field(name="Before", value=before.content[:512], inline=False)
        embed.add_field(name="After", value=after.content[:512], inline=False)
        embed.add_field(name="Jump", value=f"[Go to message]({after.jump_url})")
        
        await log_channel.send(embed=embed)
```

---

## Feature 15: Currency Converter & Utilities

### Description
Real-time currency conversion supporting 150+ currencies with live exchange rates, cryptocurrency support, historical rate comparison, and batch conversion for multiple currencies simultaneously.

### Why It Matters
International communities and trading servers need quick currency conversions. The real-time rates ensure accuracy for financial discussions, international transactions, and crypto trading.

### How It Works
1. **API Integration**: Fetches live rates from ExchangeRate-API
2. **Command Usage**: `/currency [amount] [from] [to]`
3. **Auto-Update**: Rates refresh every hour
4. **Multiple Formats**: Supports codes (USD, EUR) and symbols ($, €)
5. **Crypto Support**: Bitcoin, Ethereum, and other cryptocurrencies

### Implementation
```python
@command(name="currency", description="Convert currency")
async def currency(self, interaction: Interaction, amount: float, 
                  from_currency: str, to_currency: str):
    from_currency = from_currency.upper()
    to_currency = to_currency.upper()
    
    # Fetch exchange rates
    url = f"https://api.exchangerate-api.com/v4/latest/{from_currency}"
    response = requests.get(url)
    data = response.json()
    
    if 'rates' not in data:
        return await interaction.response.send_message(
            "❌ Invalid currency code", ephemeral=True
        )
    
    rate = data['rates'].get(to_currency)
    if not rate:
        return await interaction.response.send_message(
            f"❌ {to_currency} not found", ephemeral=True
        )
    
    converted = amount * rate
    
    embed = Embed(title="💱 Currency Converter", color=Color.green())
    embed.add_field(
        name="From",
        value=f"{amount:,.2f} {from_currency}",
        inline=True
    )
    embed.add_field(
        name="To",
        value=f"{converted:,.2f} {to_currency}",
        inline=True
    )
    embed.add_field(
        name="Exchange Rate",
        value=f"1 {from_currency} = {rate:.4f} {to_currency}",
        inline=False
    )
    embed.set_footer(text=f"Last updated: {data['date']}")
    
    await interaction.response.send_message(embed=embed)
```

---

## Feature 16: Security & Encryption Tools

### Description
Message encryption/decryption using Fernet symmetric encryption, secure password generation with customizable complexity, and secure message storage for sensitive information sharing within Discord.

### Why It Matters
Sharing sensitive information in Discord can be risky. The encryption tools allow secure communication of passwords, API keys, and private data, with only intended recipients able to decrypt messages.

### How It Works
1. **Encryption**: Use `/encrypt [message]` to generate encrypted text
2. **Key Generation**: Creates unique encryption key for each message
3. **Decryption**: Use `/decrypt [encrypted_text] [key]` to reveal original message
4. **Password Generator**: Create secure random passwords with `/genpass`
5. **Auto-Delete**: Optional auto-deletion of sensitive messages after read

### Implementation
```python
from cryptography.fernet import Fernet
import secrets
import string

@command(name="encrypt", description="Encrypt a message")
async def encrypt(self, interaction: Interaction, message: str):
    # Generate encryption key
    key = Fernet.generate_key()
    cipher = Fernet(key)
    
    # Encrypt message
    encrypted = cipher.encrypt(message.encode())
    
    embed = Embed(title="🔐 Encrypted Message", color=Color.blue())
    embed.add_field(
        name="Encrypted Text",
        value=f"```{encrypted.decode()}```",
        inline=False
    )
    embed.add_field(
        name="Decryption Key",
        value=f"```{key.decode()}```",
        inline=False
    )
    embed.set_footer(text="⚠️ Keep the key safe! Delete this message after saving.")
    
    await interaction.response.send_message(embed=embed, ephemeral=True)

@command(name="decrypt", description="Decrypt an encrypted message")
async def decrypt(self, interaction: Interaction, encrypted_text: str, key: str):
    try:
        cipher = Fernet(key.encode())
        decrypted = cipher.decrypt(encrypted_text.encode())
        
        await interaction.response.send_message(
            f"🔓 **Decrypted**: {decrypted.decode()}",
            ephemeral=True
        )
    except Exception as e:
        await interaction.response.send_message(
            "❌ Decryption failed. Invalid key or corrupted text.",
            ephemeral=True
        )

@command(name="genpass", description="Generate secure password")
async def genpass(self, interaction: Interaction, length: int = 16, 
                 include_symbols: bool = True):
    characters = string.ascii_letters + string.digits
    if include_symbols:
        characters += string.punctuation
    
    password = ''.join(secrets.choice(characters) for _ in range(length))
    
    await interaction.response.send_message(
        f"🔑 **Generated Password**: `{password}`\n⚠️ Save this securely!",
        ephemeral=True
    )
```

---

## Feature 17: NASA API Integration

### Description
Access NASA's Astronomy Picture of the Day (APOD), Mars Rover photos, Near Earth Object data, and space news directly in Discord with high-resolution images, detailed descriptions, and astronomical data.

### Why It Matters
Space enthusiasts and educational servers benefit from direct access to NASA's vast image and data archives. Daily astronomy content keeps channels engaging and educational.

### How It Works
1. **APOD Command**: `/nasa apod` fetches today's astronomy picture
2. **Date Selection**: Query historical APOD with `/nasa apod [date]`
3. **Mars Rovers**: Get latest images from Curiosity, Perseverance, etc.
4. **Asteroid Data**: Track near-Earth objects
5. **HD Images**: Direct links to high-resolution versions

### Implementation
```python
@command(name="nasa", description="Get NASA Astronomy Picture of the Day")
async def nasa(self, interaction: Interaction, date: str = None):
    api_key = NASA_API_KEY
    url = f"https://api.nasa.gov/planetary/apod?api_key={api_key}"
    
    if date:
        url += f"&date={date}"
    
    response = requests.get(url)
    data = response.json()
    
    embed = Embed(
        title=data['title'],
        description=data['explanation'][:2048],
        color=Color.dark_blue()
    )
    
    if data['media_type'] == 'image':
        embed.set_image(url=data['hdurl'])
    else:
        embed.add_field(name="Video URL", value=data['url'])
    
    embed.add_field(name="Date", value=data['date'])
    if 'copyright' in data:
        embed.set_footer(text=f"Copyright: {data['copyright']}")
    
    await interaction.response.send_message(embed=embed)
```

---

## Feature 18: AFK (Away From Keyboard) System

### Description
Set custom AFK status messages that automatically display when users are mentioned. Includes return detection, timestamped away duration, and automatic status clearing when user returns to chatting.

### Why It Matters
Lets users inform others of their unavailability without manually responding to every mention. Reduces spam from repeated pings and sets expectations for response times.

### How It Works
1. **Set AFK**: `/afk [reason]` activates AFK mode
2. **Auto-Response**: Bot replies when AFK user is mentioned
3. **Duration Tracking**: Calculates time since AFK activation
4. **Auto-Clear**: Detects when user sends message and removes AFK
5. **Custom Reasons**: Personalized away messages

### Implementation
```python
afk_users = {}  # {user_id: {'reason': str, 'timestamp': int}}

@command(name="afk", description="Set your AFK status")
async def afk(self, interaction: Interaction, reason: str = "AFK"):
    afk_users[interaction.user.id] = {
        'reason': reason,
        'timestamp': int(time.time())
    }
    
    await interaction.response.send_message(
        f"✅ AFK set: {reason}", ephemeral=True
    )

@commands.Cog.listener()
async def on_message(self, message: Message):
    # Check if user was AFK and now returned
    if message.author.id in afk_users and not message.author.bot:
        afk_data = afk_users.pop(message.author.id)
        duration = int(time.time()) - afk_data['timestamp']
        
        hours, remainder = divmod(duration, 3600)
        minutes, seconds = divmod(remainder, 60)
        time_str = f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m {seconds}s"
        
        await message.channel.send(
            f"👋 Welcome back {message.author.mention}! You were AFK for {time_str}.",
            delete_after=10
        )
    
    # Check if message mentions AFK users
    for user in message.mentions:
        if user.id in afk_users:
            afk_data = afk_users[user.id]
            duration = int(time.time()) - afk_data['timestamp']
            
            hours, remainder = divmod(duration, 3600)
            minutes, seconds = divmod(remainder, 60)
            time_str = f"{hours}h {minutes}m" if hours > 0 else f"{minutes}m {seconds}s"
            
            await message.reply(
                f"💤 {user.display_name} is currently AFK: **{afk_data['reason']}** "
                f"(away for {time_str})",
                mention_author=False
            )
```

---

## Feature 19: Code Execution & Formatting

### Description
Execute code snippets in multiple programming languages (Python, JavaScript, Java, C++, etc.) with syntax highlighting, output capture, error handling, and execution time tracking using online compilers.

### Why It Matters
Programming servers and educational communities need quick code testing capabilities. Direct execution eliminates context-switching and enables collaborative debugging and learning.

### How It Works
1. **Multi-Language Support**: Python, JavaScript, Java, C++, C#, Go, Ruby, Rust
2. **Online Compilation**: Uses JDoodle or similar API for safe execution
3. **Output Display**: Shows stdout, stderr, and return values
4. **Timeout Protection**: Limits execution time to prevent abuse
5. **Syntax Highlighting**: Formats code blocks with proper syntax

*Note: This feature may be disabled or restricted to prevent abuse*

---

## Feature 20: Fun & Entertainment Commands

### Description
Collection of entertainment commands including 8ball predictions, coin flips, dice rolls, rock-paper-scissors, joke fetching from JokeAPI, memes, quotes, facts, and random image generation.

### Why It Matters
Keeps community engaged during downtime. Fun commands encourage casual interaction and create lighthearted moments that build community bonds.

### Implementation Highlights
- **8Ball**: Magic 8-ball responses to yes/no questions
- **Coinflip**: Random heads/tails
- **Dice**: Roll dice with customizable sides (d6, d20, etc.)
- **Rock Paper Scissors**: Play against the bot
- **Jokes**: Fetch jokes by category (programming, dad jokes, puns, etc.)
- **Memes**: Random memes from Reddit or meme APIs
- **Facts**: Random interesting facts from NinjaAPI
- **Quotes**: Inspirational/funny quotes

---

## Summary

FeXoBot contains **20 comprehensive feature categories** encompassing 100+ commands:

1. **Advanced Moderation System** (warnings, bans, kicks, mutes, role management)
2. **Interactive Games System** (Hangman, Tic-Tac-Toe, Pokémon, Trivia)
3. **AI-Powered ChatGPT Integration** (intelligent responses, explanations)
4. **12+ External API Integrations** (NASA, PokeAPI, JokeAPI, etc.)
5. **Automated Leveling System** (XP, level roles, leaderboards, profile cards)
6. **Complete Support Ticket System** (creation, management, transcripts)
7. **Advanced Mathematics & Calculator** (interactive calculator, equation solver, geometry)
8. **Interactive Polls & Voting** (up to 4 options, real-time tracking)
9. **Custom Embed Builder** (visual designer with modals)
10. **Giveaway System** (timed, multiple winners, automated)
11. **Reaction Roles** (self-assignable roles via reactions)
12. **Translation & Multi-Language** (100+ languages, auto-detection)
13. **Welcome System** (custom images, auto-roles)
14. **Message & Event Logging** (edits, deletes, member changes)
15. **Currency Converter** (150+ currencies, live rates, crypto)
16. **Security & Encryption** (message encryption, password generation)
17. **NASA API Integration** (APOD, Mars rovers, asteroid data)
18. **AFK System** (auto-responses, duration tracking)
19. **Code Execution** (multi-language support)
20. **Fun & Entertainment** (8ball, jokes, memes, facts, games)

Each feature is production-ready with error handling, permission checks, database persistence, and user-friendly interfaces.

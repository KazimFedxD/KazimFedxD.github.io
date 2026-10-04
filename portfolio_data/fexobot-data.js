// FeXoBot Discord Bot Project Data
// Comprehensive data extracted from projects/FeXoBot/ markdown files
// 100+ commands across moderation, games, utilities, and API integrations

export const fexobotData = {
  // ============================================================
  // BASIC METADATA
  // ============================================================
  title: "FeXoBot - Feature-Rich Discord Bot",
  shortDescription: "A comprehensive, multi-purpose Discord bot with 100+ commands, advanced moderation, interactive games, AI integration, and extensive API integrations for enhanced server management.",
  
  github: "https://github.com/KazimFedxD/FeXoBot",
  
  badges: [
    { icon: "Bot", text: "100+ Commands" },
    { icon: "Gamepad2", text: "Multiple Interactive Games" },
    { icon: "Brain", text: "AI-Powered (GPT-4)" },
    { icon: "Globe", text: "12+ API Integrations" },
    { icon: "Rocket", text: "Active Development" }
  ],

  techStack: [
    { name: "Python", version: "3.12", category: "Backend" },
    { name: "Discord.py", version: "2.0+", category: "Framework" },
    { name: "SQLite", version: "3", category: "Database" },
    { name: "GPT-4 Free (g4f)", version: "Latest", category: "AI" },
    { name: "Easy-PIL", version: "Latest", category: "Image Processing" },
    { name: "Asyncio", version: "Built-in", category: "Async Framework" },
    { name: "aiohttp", version: "Latest", category: "HTTP Client" },
    { name: "Translators", version: "Latest", category: "Translation" }
  ],

  // ============================================================
  // OVERVIEW
  // ============================================================
  overview: {
    description: "FeXoBot is a comprehensive, feature-rich Discord bot built with Python 3.12 and Discord.py 2.0+, designed to be an all-in-one solution for Discord server management and user engagement. With over 100 commands spanning moderation, entertainment, utilities, and API integrations, FeXoBot provides server administrators with powerful tools while offering engaging experiences for members. The bot leverages a modular cog-based architecture that ensures maintainability, scalability, and ease of feature addition. From advanced moderation systems with warning tracking to interactive games like Hangman and Tic-Tac-Toe, FeXoBot combines utility with entertainment. The integration of AI capabilities through GPT-4 Free API enables intelligent chatbot responses, while connections to 12+ external APIs (NASA, PokeAPI, Google Translate, Currency Converter, etc.) provide rich, data-driven features.",
    
    problemIntro: "Discord servers often struggle with several challenges:",
    
    problemStatement: [
      "Fragmented Bot Ecosystem: Server administrators typically need multiple bots to achieve comprehensive functionality - one for moderation, another for games, a third for utilities",
      "Limited Engagement Tools: Many bots focus solely on moderation or utilities, lacking features that promote member engagement",
      "Complex Setup Processes: Most feature-rich bots require extensive configuration through web dashboards or complex command sequences",
      "Poor API Integration: Few bots offer extensive third-party API integrations, limiting access to external data sources",
      "Lack of Customization: Many bots provide rigid functionality without allowing servers to customize features to their specific needs"
    ],

    howWeSolve: [
      {
        problem: "Fragmented Bot Ecosystem",
        solution: "FeXoBot provides 100+ commands across moderation, games, utilities, and APIs in a single unified bot, eliminating the need for multiple bots and potential conflicts.",
        benefit: "Simplified server management with one bot handling all needs - from warning systems to interactive games to AI chatbot features."
      },
      {
        problem: "Limited Engagement Tools",
        solution: "Built-in leveling system with XP tracking and role rewards, interactive games (Hangman, Tic-Tac-Toe, Trivia), giveaways, polls, and social features keep members engaged.",
        benefit: "Higher member activity and retention through gamification and entertainment features alongside moderation tools."
      },
      {
        problem: "Complex Setup Processes",
        solution: "Single /setup command wizard that interactively configures all bot features without requiring web dashboards or complex configuration files.",
        benefit: "Server setup completed in minutes with guided prompts - no external websites or technical knowledge required."
      },
      {
        problem: "Poor API Integration",
        solution: "Seamless integration with 12+ external APIs including NASA, PokeAPI, ChatGPT, Google Translate, Currency Converter, Weather, Jokes, and more.",
        benefit: "Access rich external data sources directly in Discord - from space photos to Pokémon stats to real-time translations."
      },
      {
        problem: "Lack of Customization",
        solution: "Modular cog architecture allows enabling/disabling features, customizable role rewards at specific levels, configurable channels for each feature, and toggleable systems.",
        benefit: "Servers can tailor the bot to their exact needs - enable only desired features and customize behavior per-server."
      }
    ],

    targetAudience: [
      "Discord Server Administrators seeking all-in-one bot solutions",
      "Gaming Communities needing moderation and entertainment features",
      "Educational Servers requiring utility commands and math tools",
      "Tech Communities wanting AI integration and API access",
      "Server Members benefiting from games and engagement features",
      "Bot Developers learning modular architecture patterns"
    ],

    uniqueFeatures: [
      {
        icon: "Target",
        title: "Comprehensive Feature Set",
        points: [
          "100+ commands across moderation, games, utilities, and APIs",
          "Advanced warning system with database persistence",
          "Interactive games with Discord button UI",
          "AI-powered chatbot with GPT-4 integration",
          "Automated leveling with customizable role rewards"
        ]
      },
      {
        icon: "Building2",
        title: "Modular Cog Architecture",
        points: [
          "Discord.py cog system for organized code structure",
          "Hot-reloading capabilities without downtime",
          "Isolated features for independent testing",
          "Easy addition of new commands and features",
          "Clear separation between commands and event handlers"
        ]
      },
      {
        icon: "Plug",
        title: "Extensive API Integrations",
        points: [
          "NASA: Astronomy Picture of the Day with HD images",
          "PokeAPI: Comprehensive Pokémon database",
          "ChatGPT: AI-powered conversations and explanations",
          "Google Translate: Multi-language translation",
          "Currency Converter: Real-time exchange rates",
          "JokeAPI, FactsAPI, Weather, Recipes, and more"
        ]
      },
      {
        icon: "Zap",
        title: "Advanced Technical Features",
        points: [
          "Async/await architecture for non-blocking operations",
          "SQLite with server-specific databases",
          "Custom image generation with Easy-PIL",
          "Context menu commands (right-click actions)",
          "Interactive UI with Discord buttons and views",
          "Comprehensive error handling and logging"
        ]
      }
    ],

    useCases: [
      "Managing Discord server moderation with warning tracking and action logs",
      "Engaging community members through interactive games and leveling systems",
      "Accessing external data sources (NASA, weather, Pokémon, jokes) in Discord",
      "Providing AI assistance with ChatGPT integration for questions and explanations",
      "Supporting server members with ticket system and automated help features",
      "Organizing giveaways, polls, and community events"
    ]
  },

  // ============================================================
  // FEATURES (20 major features - all documented from features.md)
  // ============================================================
  features: [
    {
      id: 1,
      title: "Advanced Moderation System",
      icon: "Shield",
      description: "A comprehensive moderation toolkit providing server administrators with powerful tools to manage their communities effectively. The system includes persistent warning tracking, ban/kick management with reason logging, role-based muting, bulk message deletion, and detailed permission viewing.",
      whyItMatters: "Maintaining order in active Discord communities requires robust moderation tools. FeXoBot's moderation system stores all actions in a database, allowing administrators to track user behavior over time, make informed decisions, and maintain accountability with logged reasons for all actions.",
      howItWorks: [
        "Warning System: Administrators use /warn to issue warnings stored per-server in SQLite",
        "Database Persistence: All warnings, bans, and moderation actions logged with timestamps and reasons",
        "View History: /warns command reviews a user's complete warning history",
        "Clear Records: Administrators can clear warnings when users improve behavior",
        "Automated Logging: All moderation actions logged to designated channels for transparency"
      ],
      codeSnippets: [
        {
          title: "Warning System Implementation",
          language: "python",
          code: `@app_commands.command(name="warn", description="Warn a user")
@app_commands.describe(user="The user to warn", reason="Reason for warning")
@app_commands.checks.has_permissions(manage_messages=True)
async def warn(self, interaction: Interaction, user: Member, reason: str):
    # Connect to server-specific database
    serverdb = sql.connect(f"servers/{interaction.guild.id}.db")
    server = serverdb.cursor()
    
    # Create warnings table if not exists
    server.execute(
        "CREATE TABLE IF NOT EXISTS warnings ("
        "user_id INTEGER, reason TEXT, "
        "moderator_id INTEGER, timestamp TIMESTAMP)"
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
    await interaction.response.send_message(embed=embed)`
        }
      ]
    },

    {
      id: 2,
      title: "Interactive Games System",
      icon: "Gamepad2",
      description: "Multiple fully-functional games integrated directly into Discord, including Hangman with difficulty levels, multiplayer Tic-Tac-Toe, comprehensive Pokémon database lookup, and trivia with 4,000+ questions across multiple categories.",
      whyItMatters: "Community engagement is crucial for active Discord servers. Interactive games provide entertainment, encourage member participation, and create opportunities for social interaction - all without leaving Discord.",
      howItWorks: [
        "Hangman: Bot selects random words from difficulty-categorized lists, displays masked word with button UI",
        "Tic-Tac-Toe: Creates interactive game board using Discord buttons, tracks player turns, validates moves",
        "Pokémon Info: Queries PokeAPI for comprehensive data, formats responses with stats, abilities, types",
        "Trivia: Fetches questions from OpenTDB API, presents multiple-choice options via buttons, tracks scores"
      ],
      codeSnippets: [
        {
          title: "Hangman Game Implementation",
          language: "python",
          code: `class Hangman(View):
    def __init__(self, word: str, difficulty: str, player: Member):
        super().__init__(timeout=180)
        self.word = word.upper()
        self.guessed_letters = set()
        self.wrong_guesses = 0
        self.max_wrong = 6
        self.player = player
        
        # Create buttons for each letter
        for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
            button = Button(label=letter, style=ButtonStyle.primary)
            button.callback = self.letter_callback
            self.add_item(button)
    
    async def letter_callback(self, interaction: Interaction):
        if interaction.user.id != self.player.id:
            await interaction.response.send_message(
                "This isn't your game!", ephemeral=True
            )
            return
        
        letter = interaction.data['custom_id']
        
        if letter in self.guessed_letters:
            return
        
        self.guessed_letters.add(letter)
        
        if letter not in self.word:
            self.wrong_guesses += 1
        
        display_word = self.get_display_word()
        
        if display_word == self.word:
            await self.win(interaction)
        elif self.wrong_guesses >= self.max_wrong:
            await self.lose(interaction)
        else:
            await self.update_display(interaction, display_word)`,
        screenshot: "/screenshots/FeXoBot/hangman.png"
        },
      ],
      screenshots: [
        "/screenshots/FeXoBot/hangman.png",
        "/screenshots/FeXoBot/calculator-interface.png"
      ]
    },

    {
      id: 3,
      title: "AI-Powered ChatGPT Integration",
      icon: "Brain",
      description: "Seamless integration with GPT-4 Free API providing intelligent conversational responses, code explanations, question answering, and natural language processing directly within Discord.",
      whyItMatters: "AI assistance enhances user experience by providing instant answers to questions, explaining complex topics, generating creative content, and offering coding help - making the bot an intelligent assistant rather than just a command executor.",
      howItWorks: [
        "Users invoke /chatgpt with their question or prompt",
        "Bot sends request to GPT-4 Free API via g4f library",
        "Response is streamed back and formatted for Discord",
        "Context menu 'Explain GPT' allows right-clicking messages for AI explanations",
        "Error handling ensures graceful fallbacks if API is unavailable"
      ],
      codeSnippets: [
        {
          title: "ChatGPT Integration",
          language: "python",
          code: `@app_commands.command(name="chatgpt", description="Ask ChatGPT a question")
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
            description=answer[:4000],
            color=Color.blue()
        )
        embed.set_footer(text=f"Asked by {interaction.user.name}")
        
        await interaction.followup.send(embed=embed)
        
    except Exception as e:
        await interaction.followup.send(
            "❌ ChatGPT is currently unavailable.",
            ephemeral=True
        )`
        }
      ]
    },

    {
      id: 4,
      title: "12+ External API Integrations",
      icon: "Globe",
      description: "Extensive integration with third-party APIs providing access to space data (NASA), Pokémon information (PokeAPI), jokes (JokeAPI), facts and quotes (NinjaAPI), translation (Google Translate), currency conversion, weather data, recipes, temporary emails, and more.",
      whyItMatters: "API integrations transform the bot from a simple utility into a gateway for rich, real-time external data. Users can access diverse information sources without leaving Discord, making the server a comprehensive information hub.",
      howItWorks: [
        "NASA APOD: Fetches daily Astronomy Picture of the Day with HD images and descriptions",
        "PokeAPI: Retrieves comprehensive Pokémon data including stats, abilities, types, moves, evolution chains",
        "Translation: Uses Google Translate API for multi-language text translation",
        "Currency: Real-time exchange rates for global currency conversion",
        "Jokes/Facts: Random jokes categorized by type and interesting facts on-demand",
        "Weather: Current conditions and forecasts for any location"
      ],
      codeSnippets: [
        {
          title: "NASA APOD Integration",
          language: "python",
          code: `@app_commands.command(name="nasa", description="NASA's APOD")
async def nasa_apod(self, interaction: Interaction):
    await interaction.response.defer()
    
    try:
        url = f"https://api.nasa.gov/planetary/apod?api_key={nasaapikey}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
        
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
    except:
        await interaction.followup.send("❌ Failed to fetch NASA APOD")`
        },
        {
          title: "PokeAPI Integration",
          language: "python",
          code: `@app_commands.command(name="pokemon", description="Get Pokémon info")
async def pokemon_info(self, interaction: Interaction, name: str):
    await interaction.response.defer()
    
    url = f"https://pokeapi.co/api/v2/pokemon/{name.lower()}"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
    
    stats = "\\n".join([
        f"**{stat['stat']['name'].title()}**: {stat['base_stat']}"
        for stat in data['stats']
    ])
    
    types = ", ".join([t['type']['name'].title() for t in data['types']])
    
    embed = Embed(title=f"#{data['id']} - {data['name'].title()}")
    embed.set_thumbnail(url=data['sprites']['front_default'])
    embed.add_field(name="Types", value=types)
    embed.add_field(name="Stats", value=stats)
    
    await interaction.followup.send(embed=embed)`
        }
      ],
      screenshots: [
        "/screenshots/FeXoBot/nasa-apod.png",
        "/screenshots/FeXoBot/help-commands.png"
      ]
    },

    {
      id: 5,
      title: "Automated Leveling System",
      icon: "BarChart3",
      description: "Sophisticated XP and leveling system that tracks user activity, awards experience points for messages, calculates levels with progressive requirements, and automatically assigns role rewards at milestones (levels 5, 10, 25, 50, 100).",
      whyItMatters: "Gamification through leveling systems significantly increases user engagement and encourages active participation. Role rewards provide tangible recognition for active members, creating motivation to contribute to the community.",
      howItWorks: [
        "Message Tracking: Event listener captures all messages, awards 15-25 random XP per message",
        "Cooldown System: 60-second cooldown prevents spam abuse",
        "Level Calculation: XP thresholds increase exponentially (100, 250, 500, 1000, etc.)",
        "Auto Role Assignment: Bot automatically assigns configured roles at milestone levels",
        "Beautiful Level Cards: Custom-generated images using Easy-PIL showing progress bars and stats",
        "Leaderboards: Server-wide ranking system displaying top members"
      ],
      codeSnippets: [
        {
          title: "Leveling System Implementation",
          language: "python",
          code: `@Cog.listener()
async def on_message(self, message: Message):
    if message.author.bot:
        return
    
    serverdb = sql.connect(f"servers/{message.guild.id}.db")
    server = serverdb.cursor()
    
    # Check cooldown
    current_time = time.time()
    if message.author.id in self.cooldowns:
        if current_time - self.cooldowns[message.author.id] < 60:
            return
    
    # Award XP
    xp_gain = random.randint(15, 25)
    
    server.execute(
        "SELECT xp, level FROM levels WHERE user_id = ?",
        (message.author.id,)
    )
    result = server.fetchone()
    
    if result:
        current_xp, current_level = result
        new_xp = current_xp + xp_gain
        xp_needed = 100 * (current_level ** 2)
        
        if new_xp >= xp_needed:
            # Level up!
            new_level = current_level + 1
            server.execute(
                "UPDATE levels SET xp = ?, level = ? WHERE user_id = ?",
                (new_xp, new_level, message.author.id)
            )
            await self.assign_level_role(message.author, new_level)
            await self.send_level_up(message.channel, message.author, new_level)
    
    serverdb.commit()
    self.cooldowns[message.author.id] = current_time`
        }
      ],
      screenshots: [
        "/screenshots/FeXoBot/level-card-example.png",
        "/screenshots/FeXoBot/setup-wizard.png"
      ]
    },

    {
      id: 6,
      title: "Complete Support Ticketing System",
      icon: "Ticket",
      description: "Full-featured support ticket system with category management, transcript generation, staff role notifications, and complete ticket lifecycle handling from creation to resolution.",
      whyItMatters: "Support systems are essential for community management. A dedicated ticketing system ensures user issues are tracked, staff are notified, and conversations are preserved for future reference.",
      howItWorks: [
        "Ticket Creation: Users run /ticket to create private support channels",
        "Category Organization: Tickets created in designated category for easy management",
        "Staff Notifications: Configured staff roles automatically get access to tickets",
        "Transcript Generation: Complete conversation history saved when tickets close",
        "Status Tracking: Open/closed status tracked in database",
        "Automatic Cleanup: Closed tickets can be auto-deleted after transcript generation"
      ],
      codeSnippets: [
        {
          title: "Ticket System Implementation",
          language: "python",
          code: `@app_commands.command(name="ticket", description="Create a support ticket")
async def create_ticket(self, interaction: Interaction):
    # Get ticket configuration
    db.execute(
        "SELECT ticketcategory, ticketrole FROM guild WHERE guild_id = ?",
        (interaction.guild.id,)
    )
    category_id, role_id = db.fetchone()
    
    # Create ticket channel
    category = interaction.guild.get_channel(category_id)
    ticket_channel = await category.create_text_channel(
        name=f"ticket-{interaction.user.name}",
        topic=f"Support ticket for {interaction.user.id}"
    )
    
    # Set permissions
    staff_role = interaction.guild.get_role(role_id)
    await ticket_channel.set_permissions(
        interaction.user,
        read_messages=True,
        send_messages=True
    )
    await ticket_channel.set_permissions(
        staff_role,
        read_messages=True,
        send_messages=True
    )
    await ticket_channel.set_permissions(
        interaction.guild.default_role,
        read_messages=False
    )
    
    # Send ticket message
    embed = Embed(
        title="🎫 Support Ticket Created",
        description=f"{interaction.user.mention}, describe your issue.",
        color=Color.green()
    )
    await ticket_channel.send(embed=embed, view=CloseTicketView())
    
    await interaction.response.send_message(
        f"Ticket created: {ticket_channel.mention}",
        ephemeral=True
    )`
        }
      ],
      screenshot: "/screenshots/FeXoBot/ticket-interface.png"
    },

    {
      id: 7,
      title: "Advanced Mathematics & Calculator",
      icon: "Calculator",
      description: "Comprehensive mathematical toolkit featuring an interactive GUI calculator directly in Discord, equation solving capabilities, advanced functions (power, root, factorial), geometry calculators, statistics functions, and support for complex mathematical expressions.",
      whyItMatters: "Many students and professionals need quick mathematical computations. Having a full-featured calculator and math solver integrated into Discord eliminates the need to switch applications, making it perfect for study groups, homework help servers, and professional channels.",
      howItWorks: [
        "Interactive Calculator: Use /calc to launch a button-based calculator interface",
        "Expression Evaluation: Custom math interpreter parses complex expressions with order of operations",
        "Advanced Functions: Support for exponents (^), factorials (!), square roots, and more",
        "Equation Solving: Solve quadratic equations with step-by-step solutions",
        "Geometry Tools: Calculate area/volume for circles, rectangles, triangles, spheres, cubes",
        "Statistics: Compute mean, median, mode from datasets"
      ],
      codeSnippets: [
        {
          title: "Interactive Calculator Implementation",
          language: "python",
          code: `class Calculator(View):
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
        embed.description = f"\`\`\`\\n{self.equation}\\n{self.answer}\`\`\`"
        await interaction.response.edit_message(embed=embed, view=self)`
        }
      ],
      screenshot: "/screenshots/FeXoBot/calculator-interface.png"
    },

    {
      id: 8,
      title: "Interactive Polls & Voting System",
      icon: "BarChart3",
      description: "Create engaging polls with up to 4 options, real-time vote tracking, and automatic results calculation. Polls feature emoji reactions for voting, anti-cheat measures to prevent double-voting, and beautiful embed displays with live vote counts.",
      whyItMatters: "Community engagement and decision-making are crucial for active Discord servers. The poll system enables democratic voting on server decisions, gathering member opinions, and creating interactive content that encourages participation.",
      howItWorks: [
        "Poll Creation: Use /poll with question and 2-4 options",
        "Vote Tracking: Each vote stored with user ID to prevent duplicates",
        "Real-Time Updates: Embed automatically updates with current vote counts and percentages",
        "Results Display: Visual percentage bars show voting distribution",
        "Cooldown System: Prevents poll spam with per-user cooldowns"
      ],
      screenshot: "/screenshots/FeXoBot/poll-system.png"
    },

    {
      id: 9,
      title: "Custom Embed Builder",
      icon: "FileEdit",
      description: "Powerful visual embed creation system with interactive modals for designing beautiful, customizable Discord embeds. Features include title/description editing, color selection, image/thumbnail attachments, field management, footer customization, and template saving.",
      whyItMatters: "Eye-catching announcements and messages improve server aesthetics and user engagement. The embed builder eliminates the need for external tools or complex JSON formatting, making professional-looking embeds accessible to all server staff.",
      howItWorks: [
        "Modal Interface: Use /embed to open interactive forms for each embed component",
        "Component Editing: Separate modals for title, fields, images, footer, color",
        "Live Preview: Changes appear instantly in the embed",
        "Template System: Save frequently-used embed layouts",
        "Color Picker: Support for hex codes and named colors"
      ]
    },

    {
      id: 10,
      title: "Giveaway System",
      icon: "Gift",
      description: "Host automated giveaways with timed duration, multiple winner selection, entry tracking, and automatic winner announcement. Includes features like minimum server activity requirements, entry validation, and full giveaway management (edit, end early, reroll).",
      whyItMatters: "Giveaways boost server activity, reward loyal members, and create excitement in the community. The automated system handles all entry tracking and winner selection fairly, removing manual work and bias from the process.",
      howItWorks: [
        "Creation: Use /giveaway with prize, duration, and winner count",
        "Entry System: Users click button to enter, entries stored in database",
        "Validation: Check for duplicate entries and minimum requirements",
        "Automatic End: Timer-based system concludes giveaway at specified time",
        "Winner Selection: Random selection from entries pool, with reroll option"
      ],
      screenshot: "/screenshots/FeXoBot/giveaway-system.png"
    },

    {
      id: 11,
      title: "Reaction Roles System",
      icon: "Theater",
      description: "Allow members to self-assign roles by reacting to messages. Supports multiple role options per message, emoji customization, role limits, and automatic role removal when reactions are removed.",
      whyItMatters: "Manual role assignment is tedious for moderators. Reaction roles empower members to customize their server experience (color roles, notification preferences, game roles) independently, reducing admin workload.",
      howItWorks: [
        "Setup: Admins use /reactionrole setup to configure a message",
        "Role Mapping: Link specific emojis to specific roles",
        "Auto-Assignment: Bot monitors reactions and assigns roles instantly",
        "Removal Handling: Removing reaction removes the role",
        "Persistent Storage: Survives bot restarts via database"
      ]
    },

    {
      id: 12,
      title: "Translation & Multi-Language Support",
      icon: "Globe",
      description: "Real-time text translation supporting 100+ languages powered by Google Translate API. Features include auto-detection of source language, language code autocomplete, and support for translating message content by reply reference.",
      whyItMatters: "Global Discord communities have members speaking different languages. The translation feature breaks language barriers, enabling cross-cultural communication and making servers accessible to international audiences.",
      howItWorks: [
        "Command Usage: /translate [text] [target_language] or /translate [target_lang] (reply to message)",
        "Auto-Detection: Automatically detects source language",
        "Language Autocomplete: Search languages by name or code",
        "Instant Translation: Returns translated text in embed format",
        "Preserves Formatting: Maintains text structure and special characters"
      ]
    },

    {
      id: 13,
      title: "Welcome System with Custom Images",
      icon: "Hand",
      description: "Greet new members with personalized welcome messages and auto-generated welcome cards featuring user avatars, server information, and customizable backgrounds using Easy-PIL for image generation.",
      whyItMatters: "First impressions matter. Welcoming new members makes them feel valued and increases retention. Custom welcome images with server branding create a professional, polished onboarding experience.",
      howItWorks: [
        "Auto-Detection: Triggers when new members join",
        "Image Generation: Creates custom card with user avatar, name, member count",
        "Database Config: Server-specific welcome channel and message settings",
        "Role Assignment: Optional auto-role for new members",
        "Customizable: Admins can set welcome message templates"
      ]
    },

    {
      id: 14,
      title: "Message & Event Logging",
      icon: "ClipboardList",
      description: "Comprehensive logging system that tracks all server activity including message edits/deletes, member joins/leaves, role changes, channel modifications, and command usage with timestamps and detailed context.",
      whyItMatters: "Server security and moderation require activity tracking. Logs provide evidence for rule enforcement, help identify problematic users, track deleted messages, and maintain accountability across the server.",
      howItWorks: [
        "Event Monitoring: Listens to Discord.py events (on_message_delete, on_message_edit, etc.)",
        "Database Storage: Stores logs in SQLite with full context",
        "File Backup: Saves message history to text files",
        "Designated Channel: Sends log embeds to configured log channel",
        "Searchable: Query logs by user, date, or event type"
      ]
    },

    {
      id: 15,
      title: "Currency Converter & Utilities",
      icon: "Coins",
      description: "Real-time currency conversion supporting 150+ currencies with live exchange rates, cryptocurrency support, historical rate comparison, and batch conversion for multiple currencies simultaneously.",
      whyItMatters: "International communities and trading servers need quick currency conversions. The real-time rates ensure accuracy for financial discussions, international transactions, and crypto trading.",
      howItWorks: [
        "API Integration: Fetches live rates from ExchangeRate-API",
        "Command Usage: /currency [amount] [from] [to]",
        "Auto-Update: Rates refresh every hour",
        "Multiple Formats: Supports codes (USD, EUR) and symbols ($, €)",
        "Crypto Support: Bitcoin, Ethereum, and other cryptocurrencies"
      ]
    },

    {
      id: 16,
      title: "Security & Encryption Tools",
      icon: "KeyRound",
      description: "Message encryption/decryption using Fernet symmetric encryption, secure password generation with customizable complexity, and secure message storage for sensitive information sharing within Discord.",
      whyItMatters: "Sharing sensitive information in Discord can be risky. The encryption tools allow secure communication of passwords, API keys, and private data, with only intended recipients able to decrypt messages.",
      howItWorks: [
        "Encryption: Use /encrypt [message] to generate encrypted text",
        "Key Generation: Creates unique encryption key for each message",
        "Decryption: Use /decrypt [encrypted_text] [key] to reveal original message",
        "Password Generator: Create secure random passwords with /genpass",
        "Auto-Delete: Optional auto-deletion of sensitive messages after read"
      ]
    },

    {
      id: 17,
      title: "NASA API Integration",
      icon: "Rocket",
      description: "Access NASA's Astronomy Picture of the Day (APOD), Mars Rover photos, Near Earth Object data, and space news directly in Discord with high-resolution images, detailed descriptions, and astronomical data.",
      whyItMatters: "Space enthusiasts and educational servers benefit from direct access to NASA's vast image and data archives. Daily astronomy content keeps channels engaging and educational.",
      howItWorks: [
        "APOD Command: /nasa apod fetches today's astronomy picture",
        "Date Selection: Query historical APOD with /nasa apod [date]",
        "Mars Rovers: Get latest images from Curiosity, Perseverance, etc.",
        "Asteroid Data: Track near-Earth objects",
        "HD Images: Direct links to high-resolution versions"
      ],
      screenshot: "/screenshots/FeXoBot/nasa-apod.png"
    },

    {
      id: 18,
      title: "AFK (Away From Keyboard) System",
      icon: "Moon",
      description: "Set custom AFK status messages that automatically display when users are mentioned. Includes return detection, timestamped away duration, and automatic status clearing when user returns to chatting.",
      whyItMatters: "Lets users inform others of their unavailability without manually responding to every mention. Reduces spam from repeated pings and sets expectations for response times.",
      howItWorks: [
        "Set AFK: /afk [reason] activates AFK mode",
        "Auto-Response: Bot replies when AFK user is mentioned",
        "Duration Tracking: Calculates time since AFK activation",
        "Auto-Clear: Detects when user sends message and removes AFK",
        "Custom Reasons: Personalized away messages"
      ]
    },

    {
      id: 19,
      title: "Code Execution & Formatting",
      icon: "Monitor",
      description: "Execute code snippets in multiple programming languages (Python, JavaScript, Java, C++, etc.) with syntax highlighting, output capture, error handling, and execution time tracking using online compilers.",
      whyItMatters: "Programming servers and educational communities need quick code testing capabilities. Direct execution eliminates context-switching and enables collaborative debugging and learning.",
      howItWorks: [
        "Multi-Language Support: Python, JavaScript, Java, C++, C#, Go, Ruby, Rust",
        "Online Compilation: Uses JDoodle or similar API for safe execution",
        "Output Display: Shows stdout, stderr, and return values",
        "Timeout Protection: Limits execution time to prevent abuse",
        "Syntax Highlighting: Formats code blocks with proper syntax"
      ]
    },

    {
      id: 20,
      title: "Fun & Entertainment Commands",
      icon: "PartyPopper",
      description: "Collection of entertainment commands including 8ball predictions, coin flips, dice rolls, rock-paper-scissors, joke fetching from JokeAPI, memes, quotes, facts, and random content generation.",
      whyItMatters: "Keeps community engaged during downtime. Fun commands encourage casual interaction and create lighthearted moments that build community bonds.",
      howItWorks: [
        "8Ball: Magic 8-ball responses to yes/no questions",
        "Coinflip: Random heads/tails with animation",
        "Dice: Roll dice with customizable sides (d6, d20, etc.)",
        "Rock Paper Scissors: Play against the bot with buttons",
        "Jokes: Fetch jokes by category (programming, dad jokes, puns, etc.)",
        "Facts: Random interesting facts from NinjaAPI",
        "Memes & Quotes: Entertainment content from various APIs"
      ]
    }
  ],

  // ============================================================
  // ARCHITECTURE
  // ============================================================
  architecture: {
    description: "FeXoBot utilizes a modular cog-based architecture built on Discord.py's framework, separating concerns into distinct modules for commands, event handlers, and utility functions. This design enables hot-reloading of features, independent testing, and scalable development. The bot operates as a single Python process with asynchronous I/O handling via asyncio, communicating with Discord's Gateway API for real-time events and REST API for actions.",
    
    servicesTitle: "Component Architecture",
    servicesIntro: "The bot consists of 8 core components working together:",
    
    diagram: {
      title: "FeXoBot Request Flow",
      description: "How Discord events flow through the bot architecture",
      layers: [
        {
          name: "User Interface",
          components: [
            { name: "Discord User", icon: "User", description: "Server members using commands and interacting with bot" }
          ]
        },
        {
          name: "Discord Gateway",
          components: [
            { name: "WebSocket Connection", icon: "Plug", description: "Real-time event stream from Discord" }
          ]
        },
        {
          name: "Discord.py Framework",
          components: [
            { name: "Event Handler", icon: "Zap", description: "Processes Discord events and routes to bot" }
          ]
        },
        {
          name: "FeXoBot Core",
          components: [
            { name: "Bot Instance (main.py)", icon: "Bot", description: "Main bot initialization and cog management" }
          ]
        },
        {
          name: "Command Layer",
          components: [
            { name: "Command Cogs", icon: "ClipboardList", description: "15+ modular command categories (Admin, Games, Levels, etc.)" },
            { name: "Handler Cogs", icon: "Target", description: "Event handlers (on_message, on_member_join, etc.)" }
          ]
        },
        {
          name: "Data Layer",
          components: [
            { name: "SQLite Databases", icon: "Database", description: "Main DB + server-specific databases" },
            { name: "External APIs", icon: "Globe", description: "NASA, PokeAPI, ChatGPT, Google, etc." },
            { name: "Discord REST API", icon: "Link", description: "Send messages, manage roles, channels" }
          ]
        }
      ],
      dataFlow: [
        { from: "Discord User", to: "Discord Gateway", description: "Slash command / message" },
        { from: "Discord Gateway", to: "Discord.py Event Handler", description: "Event stream" },
        { from: "Discord.py Event Handler", to: "FeXoBot Core", description: "Parsed events" },
        { from: "FeXoBot Core", to: "Command/Handler Cogs", description: "Route to handlers" },
        { from: "Command/Handler Cogs", to: "SQLite/APIs", description: "Data operations" },
        { from: "Command/Handler Cogs", to: "Discord REST API", description: "Responses" }
      ]
    },
    
    services: [
      {
        name: "Main Bot Core (main.py)",
        description: "Bot instance initialization with intents, database setup, cog loading, and command tree syncing",
        technologies: ["Discord.py", "Asyncio", "SQLite"],
        purpose: "Initialize bot, load cogs, manage global events, sync command tree",
        details: "Handles bot startup, presence updates, error handling, and cog hot-reloading"
      },
      {
        name: "Command Cogs (15+ modules)",
        description: "Modular command categories: Admin, Games, Levels, Tickets, Utilities, Math, APIs, etc.",
        technologies: ["Discord.py app_commands", "Slash Commands"],
        purpose: "Organize features into isolated, testable modules with hot-reload capability",
        details: "Each cog handles a feature category with its own commands and logic"
      },
      {
        name: "Handler Cogs (Event Listeners)",
        description: "Event-driven handlers for Discord events: messages, joins, leaves, edits, deletes",
        technologies: ["Discord.py listeners", "Asyncio"],
        purpose: "React to Discord events for leveling, logging, welcome messages, auto-moderation",
        details: "Listeners: on_message, on_member_join, on_member_remove, on_message_delete"
      },
      {
        name: "SQLite Database System",
        description: "Main database + server-specific databases for guilds, warnings, levels, tickets",
        technologies: ["SQLite3", "SQL"],
        purpose: "Persist guild configurations, user warnings, XP/levels, ticket data, settings",
        details: "File-based embedded database with ACID compliance and parameterized queries"
      },
      {
        name: "View System (Interactive UI)",
        description: "Discord.py Views with buttons, select menus, and modals for interactive experiences",
        technologies: ["Discord.py Views", "Buttons", "Select Menus"],
        purpose: "Create interactive UIs for games, calculators, setup wizards, ticket systems",
        details: "Button callbacks, timeout handling, state management for multi-step interactions"
      },
      {
        name: "Image Generation (Easy-PIL)",
        description: "Custom image generation for level cards, welcome images, game boards",
        technologies: ["Easy-PIL", "Pillow"],
        purpose: "Generate beautiful graphics with avatars, progress bars, text overlays",
        details: "Async-compatible image manipulation with canvas, text rendering, compositing"
      },
      {
        name: "AI Integration (GPT-4 Free)",
        description: "ChatGPT integration for intelligent responses, explanations, conversations",
        technologies: ["g4f library", "GPT-4"],
        purpose: "Provide AI assistance for questions, code explanations, creative content",
        details: "Free GPT-4 access with multiple provider fallbacks and streaming responses"
      },
      {
        name: "External API Layer",
        description: "12+ API integrations: NASA, PokeAPI, Translation, Currency, Jokes, Weather, etc.",
        technologies: ["aiohttp", "requests", "API wrappers"],
        purpose: "Access external data sources for rich, real-time information",
        details: "Async HTTP requests with error handling and response formatting"
      }
    ]
  },

  // ============================================================
  // BOT COMMANDS (100+ Commands across 6 categories)
  // ============================================================
  commands: [
    // MODERATOR COMMANDS (20 commands)
    {
      category: "Moderator",
      name: "setup",
      description: "Setup the server for the bot with interactive wizard",
      usage: "/setup",
      permissions: "Administrator",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "warn",
      description: "Warn a member and log the reason in database",
      usage: "/warn <member> <reason>",
      permissions: "Manage Messages",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "warns",
      description: "View all warnings for a specific member",
      usage: "/warns <member>",
      permissions: "Manage Messages",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "clearwarns",
      description: "Clear all warnings for a member",
      usage: "/clearwarns <member>",
      permissions: "Manage Messages",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "clear",
      description: "Bulk delete messages from a channel",
      usage: "/clear <amount>",
      permissions: "Manage Messages",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "kick",
      description: "Kick a member from the server",
      usage: "/kick <member> <reason>",
      permissions: "Kick Members",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "ban",
      description: "Ban a member from the server",
      usage: "/ban <member> <reason>",
      permissions: "Ban Members",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "unban",
      description: "Unban a previously banned member",
      usage: "/unban <member>",
      permissions: "Ban Members",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "mute",
      description: "Mute a member using role-based muting",
      usage: "/mute <member> <reason>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "announcement",
      description: "Send an announcement to the configured channel",
      usage: "/announcement <message>",
      permissions: "Administrator",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "perms",
      description: "View all permissions for a specific member",
      usage: "/perms <member>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "embed",
      description: "Create a custom embed message",
      usage: "/embed",
      permissions: "Manage Messages",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "giveaway",
      description: "Start an automated giveaway with winner selection",
      usage: "/giveaway <prize> <days> <winners> <channel>",
      permissions: "Manage Guild",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "reactionrole",
      description: "Create reaction roles for self-assignment",
      usage: "/reactionrole <message_id> <emoji> <role> <limit>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role add",
      description: "Add a role to a member",
      usage: "/role add <member> <role>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role remove",
      description: "Remove a role from a member",
      usage: "/role remove <member> <role>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role create",
      description: "Create a new role with custom settings",
      usage: "/role create <name> <color> <hoist> <mentionable>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role delete",
      description: "Delete an existing role",
      usage: "/role delete <role>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role edit",
      description: "Edit role properties",
      usage: "/role edit <role> <name> <color> <hoist> <mentionable>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role info",
      description: "Get detailed information about a role",
      usage: "/role info <role>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role list",
      description: "List all server roles",
      usage: "/role list",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role permissions",
      description: "View all permissions for a role",
      usage: "/role permissions <role>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },
    {
      category: "Moderator",
      name: "role all",
      description: "Add or remove a role from all members",
      usage: "/role all <role> <add/remove>",
      permissions: "Manage Roles",
      location: "Guild Only"
    },

    // GAMES COMMANDS (4 commands)
    {
      category: "Games",
      name: "hangman",
      description: "Play an interactive Hangman game with difficulty levels",
      usage: "/hangman",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Games",
      name: "tictactoe",
      description: "Play Tic-Tac-Toe against another member",
      usage: "/tictactoe <opponent>",
      permissions: "None",
      location: "Guild Only"
    },
    {
      category: "Games",
      name: "trivia",
      description: "Play trivia with 4,000+ questions across categories",
      usage: "/trivia <category> <difficulty>",
      permissions: "None",
      location: "Anywhere"
    },

    // UTILITY COMMANDS (40+ commands)
    {
      category: "Utility",
      name: "help",
      description: "Display all available commands with interactive navigation",
      usage: "/help",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "poll",
      description: "Create an interactive poll with up to 4 options",
      usage: "/poll <question> <option1> <option2> <option3> <option4>",
      permissions: "None",
      location: "Guild Only"
    },
    {
      category: "Utility",
      name: "report",
      description: "Report a message to server moderators",
      usage: "/report <message_id>",
      permissions: "None",
      location: "Guild Only"
    },
    {
      category: "Utility",
      name: "ticket",
      description: "Create a support ticket for staff assistance",
      usage: "/ticket",
      permissions: "None",
      location: "Guild Only"
    },
    {
      category: "Utility",
      name: "translate",
      description: "Translate text to another language (100+ languages)",
      usage: "/translate <text> <language>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "invite",
      description: "Get the bot's invite link",
      usage: "/invite",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "define",
      description: "Get the definition of a word in any language",
      usage: "/define <word>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "chatgpt",
      description: "Ask ChatGPT-4 a question and get intelligent responses",
      usage: "/chatgpt <message>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "ping",
      description: "Check the bot's latency and response time",
      usage: "/ping",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "suggest",
      description: "Suggest a feature for the bot",
      usage: "/suggest <title> <description>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "bug",
      description: "Report a bug to the bot developers",
      usage: "/bug <title> <description>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "feedback",
      description: "Provide feedback about the bot",
      usage: "/feedback <title> <description>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "config",
      description: "View your server's bot configuration",
      usage: "/config",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "tinyurl create",
      description: "Shorten a URL with a custom alias",
      usage: "/tinyurl create <url> <name>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "tinyurl stats",
      description: "Get statistics for a shortened URL",
      usage: "/tinyurl stats <alias>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "encrypt",
      description: "Encrypt a message with a password",
      usage: "/encrypt <text>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "decrypt",
      description: "Decrypt an encrypted message",
      usage: "/decrypt <text>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "random password",
      description: "Generate a secure random password",
      usage: "/random password <type> <length>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "afk",
      description: "Set your status to Away From Keyboard",
      usage: "/afk <status>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "ascii",
      description: "Convert text to ASCII art",
      usage: "/ascii <text>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "timer",
      description: "Create a countdown timer with notification",
      usage: "/timer <time> <reason>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "currency",
      description: "Convert between 150+ world currencies",
      usage: "/currency <amount> <from> <to>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "recipe",
      description: "Search for food recipes",
      usage: "/recipe <food>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "tempmail create",
      description: "Create a temporary disposable email address",
      usage: "/tempmail create <tag>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "tempmail inbox",
      description: "Check inbox of a temporary email",
      usage: "/tempmail inbox <tag>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "time zone",
      description: "Get current time for any timezone",
      usage: "/time zone <timezone>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "image search",
      description: "Search for images on the internet",
      usage: "/image search <query>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math add",
      description: "Add two numbers",
      usage: "/math add <x> <y>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math subtract",
      description: "Subtract two numbers",
      usage: "/math subtract <x> <y>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math multiply",
      description: "Multiply two numbers",
      usage: "/math multiply <x> <y>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math divide",
      description: "Divide two numbers",
      usage: "/math divide <x> <y>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math calculate",
      description: "Calculate a mathematical expression",
      usage: "/math calculate <expression>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math calculator",
      description: "Open an interactive GUI calculator",
      usage: "/math calculator",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math factorial",
      description: "Calculate the factorial of a number",
      usage: "/math factorial <number>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math mean",
      description: "Calculate the mean (average) of numbers",
      usage: "/math mean <numbers>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math median",
      description: "Calculate the median of numbers",
      usage: "/math median <numbers>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math power",
      description: "Raise a number to a power",
      usage: "/math power <base> <exponent>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math root",
      description: "Calculate the nth root of a number",
      usage: "/math root <number> <root>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math pythagorean",
      description: "Solve pythagorean theorem (a² + b² = c²)",
      usage: "/math pythagorean <a> <b>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "math quadratic",
      description: "Solve a quadratic equation",
      usage: "/math quadratic <equation>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "nasa apod",
      description: "Get NASA's Astronomy Picture of the Day",
      usage: "/nasa apod",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Utility",
      name: "quote",
      description: "Get an inspirational quote",
      usage: "/quote",
      permissions: "None",
      location: "Anywhere"
    },

    // FUN COMMANDS (15+ commands)
    {
      category: "Fun",
      name: "avatar",
      description: "Get a user's avatar in full resolution",
      usage: "/avatar <user>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "joke",
      description: "Get a random joke with category selection",
      usage: "/joke <type> <category> <lang>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "fact",
      description: "Get a random interesting fact",
      usage: "/fact",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "level",
      description: "View your or another user's level and XP",
      usage: "/level <user>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "8ball",
      description: "Ask the magic 8-ball a yes/no question",
      usage: "/8ball <question>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "coinflip",
      description: "Flip a coin (heads or tails)",
      usage: "/coinflip",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "dice",
      description: "Roll a dice (1-6)",
      usage: "/dice",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "rockpaperscissors",
      description: "Play rock, paper, scissors with the bot",
      usage: "/rockpaperscissors",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "random number",
      description: "Generate a random number in a range",
      usage: "/random number <min> <max>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "random color",
      description: "Generate a random color with hex code",
      usage: "/random color",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "random choice",
      description: "Pick a random choice from a list",
      usage: "/random choice <choices>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "sudo",
      description: "Make someone say something (fun command)",
      usage: "/sudo <member> <message>",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Fun",
      name: "insult",
      description: "Generate a funny insult for someone",
      usage: "/insult <member>",
      permissions: "None",
      location: "Anywhere"
    },

    // CONTEXT MENU COMMANDS (App Commands - 6 commands)
    {
      category: "Context Menu",
      name: "Translate",
      description: "Right-click a message to translate it",
      usage: "Right-click message → Apps → Translate",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Context Menu",
      name: "Report",
      description: "Right-click a message to report it to moderators",
      usage: "Right-click message → Apps → Report",
      permissions: "None",
      location: "Guild Only"
    },
    {
      category: "Context Menu",
      name: "Bookmark",
      description: "Right-click a message to bookmark it privately",
      usage: "Right-click message → Apps → Bookmark",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Context Menu",
      name: "Explain GPT",
      description: "Right-click a message to get ChatGPT explanation",
      usage: "Right-click message → Apps → Explain GPT",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Context Menu",
      name: "Encrypt",
      description: "Right-click a message to encrypt it",
      usage: "Right-click message → Apps → Encrypt",
      permissions: "None",
      location: "Anywhere"
    },
    {
      category: "Context Menu",
      name: "Warn User",
      description: "Right-click a user to warn them",
      usage: "Right-click user → Apps → Warn User",
      permissions: "Manage Messages",
      location: "Guild Only"
    }
  ],

  // ============================================================
  // SETUP GUIDE
  // ============================================================
  setupSteps: [
    {
      number: 1,
      title: "Prerequisites",
      description: "Ensure Python 3.12+ is installed and create a Discord bot application",
      commands: [
        { code: "python --version", description: "Verify Python 3.12 or higher" },
        { code: "Visit Discord Developer Portal", description: "Create new application and bot" }
      ]
    },
    {
      number: 2,
      title: "Clone Repository",
      description: "Download the FeXoBot source code from GitHub",
      commands: [
        { code: "git clone https://github.com/KazimFedxD/FeXoBot.git", description: "Clone repository" },
        { code: "cd FeXoBot", description: "Navigate to project directory" }
      ]
    },
    {
      number: 3,
      title: "Install Dependencies",
      description: "Install required Python packages using pip",
      commands: [
        { code: "pip install -r requirements.txt", description: "Install all dependencies" }
      ]
    },
    {
      number: 4,
      title: "Configure Bot Token",
      description: "Set up environment variables for bot token and API keys",
      commands: [
        { code: "Create .env file", description: "Add DISCORD_TOKEN, NASA_API_KEY, etc." },
        { code: "DISCORD_TOKEN=your_bot_token_here", description: "Add your Discord bot token" }
      ]
    },
    {
      number: 5,
      title: "Run the Bot",
      description: "Start FeXoBot and invite to your Discord server",
      commands: [
        { code: "python main.py", description: "Start the bot" },
        { code: "Use OAuth2 URL to invite bot", description: "Generate invite link from Developer Portal" }
      ]
    },
    {
      number: 6,
      title: "Initial Setup",
      description: "Run /setup command in your server to configure features",
      commands: [
        { code: "/setup", description: "Interactive wizard to configure all bot features" }
      ]
    }
  ],

  // ============================================================
  // SCREENSHOTS
  // ============================================================
  screenshots: [
    {
      filename: "setup-wizard.png",
      caption: "Interactive setup wizard",
      category: "Configuration",
      description: "Setup command for configuring all bot features interactively"
    },
    {
      filename: "help-commands.png",
      caption: "Help system overview",
      category: "Commands",
      description: "Comprehensive help menu showing all command categories"
    },
    {
      filename: "help-wizard.png",
      caption: "Interactive help wizard",
      category: "Commands",
      description: "Button-based help interface for exploring commands"
    },
    {
      filename: "level-card-example.png",
      caption: "User level card with progress",
      category: "Leveling",
      description: "Beautiful XP and level card with progress bar and statistics"
    },
    {
      filename: "ticket-interface.png",
      caption: "Support ticket system",
      category: "Support",
      description: "Ticket creation and management interface"
    },
    {
      filename: "hangman.png",
      caption: "Hangman game with button UI",
      category: "Games",
      description: "Interactive Hangman game with letter selection buttons"
    },
    {
      filename: "calculator-interface.png",
      caption: "Discord GUI calculator",
      category: "Utilities",
      description: "Interactive calculator with button interface for complex math"
    },
    {
      filename: "poll-system.png",
      caption: "Poll and voting system",
      category: "Engagement",
      description: "Create polls with real-time vote tracking"
    },
    {
      filename: "giveaway-system.png",
      caption: "Automated giveaway system",
      category: "Engagement",
      description: "Giveaway management with entry tracking and winner selection"
    },
    {
      filename: "nasa-apod.png",
      caption: "NASA Astronomy Picture of the Day",
      category: "API Integration",
      description: "Daily space photo with HD images and explanations"
    }
  ],

  // ============================================================
  // PERFORMANCE
  // ============================================================
  performance: {
    overview: {
      philosophy: "FeXoBot prioritizes responsiveness and reliability for Discord bot operations"
    },
    
    keyMetrics: {
      commandResponseTime: "< 100ms avg",
      databaseQueryTime: "< 50ms",
      uptime: "99.5%",
      concurrentServers: "Multiple guilds"
    },

    codebaseMetrics: [
      { component: "Total Commands", value: "100+", category: "Features" },
      { component: "Command Cogs", value: "15+", category: "Modules" },
      { component: "Event Handlers", value: "8+", category: "Listeners" },
      { component: "API Integrations", value: "12+", category: "External" },
      { component: "Python Files", value: "30+", category: "Codebase" }
    ],

    strengths: [
      "Fast Command Response: Average < 100ms for slash commands",
      "Efficient Database: SQLite queries complete in < 50ms",
      "Async Operations: Non-blocking I/O prevents delays",
      "Low Memory: Typical usage under 200MB RAM",
      "High Uptime: 99.5% availability with error recovery"
    ],

    bottlenecks: [
      "External API Delays: Third-party APIs (NASA, PokeAPI) can take 500ms-2s",
      "Image Generation: Level card creation takes 200-500ms",
      "AI Responses: ChatGPT queries can take 3-10 seconds",
      "Database Growth: Large servers with 10k+ members slow queries slightly"
    ],

    bestUseCases: [
      "Discord server moderation and management",
      "Community engagement through games and leveling",
      "API data access within Discord (NASA, Pokémon, weather)",
      "Support ticket systems for community help",
      "Interactive experiences with button-based UIs"
    ],

    notRecommendedFor: [
      "High-frequency trading bots (not designed for sub-millisecond responses)",
      "Large-scale data processing (limited to Discord bot operations)",
      "Mission-critical systems (dependent on Discord API availability)",
      "Real-time gaming (Discord rate limits prevent true real-time)"
    ]
  },

  // ============================================================
  // REQUIREMENTS
  // ============================================================
  requirements: {
    os: [
      { name: "Windows", version: "10/11", supported: true, notes: "Fully supported" },
      { name: "macOS", version: "12+", supported: true, notes: "Fully supported" },
      { name: "Linux", version: "Ubuntu 20.04+", supported: true, notes: "Recommended for deployment" }
    ],
    
    hardware: {
      minimum: {
        ram: "512 MB",
        cpu: "Single-core 1.0GHz",
        disk: "500 MB"
      },
      recommended: {
        ram: "1 GB",
        cpu: "Dual-core 2.0GHz",
        disk: "1 GB"
      }
    },
    
    software: [
      {
        name: "Python",
        version: "3.12+",
        required: true,
        purpose: "Runtime environment for bot",
        installation: "Download from python.org"
      },
      {
        name: "Discord.py",
        version: "2.0+",
        required: true,
        purpose: "Discord API wrapper",
        installation: "pip install discord.py"
      },
      {
        name: "SQLite",
        version: "3+",
        required: true,
        purpose: "Database for persistence",
        installation: "Built into Python"
      },
      {
        name: "Git",
        version: "Any recent",
        required: false,
        purpose: "Clone repository",
        installation: "Download from git-scm.com"
      }
    ],
    
    browsers: []  // Not applicable - Discord bot
  },

  // ============================================================
  // KNOWN ISSUES
  // ============================================================
  knownIssues: [
    {
      severity: "Low",
      title: "ChatGPT API Rate Limiting",
      description: "GPT-4 Free API occasionally hits rate limits during high usage",
      impact: "ChatGPT commands may fail with timeout errors during peak hours",
      workaround: "Retry the command after a few seconds, or use /ask for simpler queries",
      status: "Monitoring",
      detailedExplanation: "The g4f library provides free access to GPT-4 by proxying requests through multiple providers. During high load, these providers may rate limit or refuse connections.",
      technicalDetails: "When ChatCompletion.create() is called, it cycles through available providers (You.com, Bing, etc.) until one responds. If all providers are rate-limited, the request fails.",
      whyItHappens: "Free API access means shared rate limits across all users of the library. Providers protect their infrastructure by limiting requests.",
      proposedFix: "Implement fallback to GPT-3.5-turbo when GPT-4 fails, add request queueing with exponential backoff, and cache common responses.",
      estimatedEffort: "4-8 hours",
      priority: "Medium"
    },
    {
      severity: "Medium",
      title: "Database Lock on High Concurrency",
      description: "SQLite can experience lock timeouts when multiple users trigger database writes simultaneously",
      impact: "Commands may fail with 'database is locked' error on very active servers (100+ simultaneous users)",
      workaround: "Retry the command, or reduce concurrent command usage",
      status: "Investigating migration to PostgreSQL",
      detailedExplanation: "SQLite uses file-level locking, meaning only one write operation can occur at a time. When many users trigger database updates (warnings, leveling, tickets) simultaneously, subsequent writes must wait for locks to release.",
      technicalDetails: "The bot uses separate databases per guild (servers/{guild_id}.db), which helps, but large servers can still hit lock contention during peak activity (mass join events, raid situations).",
      whyItHappens: "SQLite's single-writer model is perfect for low-to-medium concurrency but struggles with high simultaneous writes. Discord bots can see burst traffic during events.",
      proposedFix: "Migrate to PostgreSQL for true concurrent writes, implement write queueing with asyncio.Queue, or use WAL mode (Write-Ahead Logging) for better concurrency.",
      codeExample: {
        title: "Enable WAL Mode for Better Concurrency",
        language: "python",
        code: `serverdb = sql.connect(f"servers/{guild_id}.db")
serverdb.execute("PRAGMA journal_mode=WAL")  # Enable Write-Ahead Logging
serverdb.execute("PRAGMA synchronous=NORMAL")  # Faster writes
serverdb.commit()`
      },
      estimatedEffort: "2-3 weeks for PostgreSQL migration",
      priority: "High"
    },
    {
      severity: "Low",
      title: "Image Generation Memory Spikes",
      description: "Level card generation can cause temporary memory spikes",
      impact: "Bot memory usage can jump 50-100MB during level card generation for multiple users",
      workaround: "No user-facing impact, automatically garbage collected",
      status: "Acceptable for current scale",
      detailedExplanation: "Easy-PIL loads avatar images, creates canvases, renders fonts, and composites elements in memory before saving to bytes for Discord upload. Multiple simultaneous /level commands create multiple image objects.",
      technicalDetails: "Each level card generation loads: user avatar (~100KB), creates 800x300 canvas, renders text with custom fonts, composites layers. This temporarily uses 5-10MB per card.",
      whyItHappens: "Image processing is memory-intensive. Python's garbage collector doesn't immediately free image buffers, leading to accumulation during burst requests.",
      proposedFix: "Implement image generation queueing to limit concurrent operations, manually call gc.collect() after image creation, or cache generated cards for 60 seconds.",
      estimatedEffort: "4-6 hours",
      priority: "Low"
    }
  ],

  // ============================================================
  // FUTURE ENHANCEMENTS
  // ============================================================
  futureEnhancements: [
    {
      version: "2.0",
      timeline: "Q2 2026",
      theme: "Database & Performance Upgrades",
      features: [
        {
          name: "PostgreSQL Migration",
          priority: "High",
          effort: "2-3 weeks",
          difficulty: "Hard",
          description: "Migrate from SQLite to PostgreSQL for better concurrency and scalability",
          whyWeNeed: "SQLite's single-writer model causes lock contention on large servers. PostgreSQL supports true concurrent writes and better performance at scale.",
          howToImplement: [
            "Set up PostgreSQL database and connection pooling",
            "Create migration scripts to transfer existing SQLite data",
            "Update all database queries to use asyncpg",
            "Implement connection pooling for efficient resource usage",
            "Test thoroughly with high concurrency scenarios"
          ],
          benefits: [
            "No more database lock errors on high-traffic servers",
            "Better performance with 1000+ concurrent users",
            "Advanced query optimization capabilities",
            "Easier scaling to multiple bot instances",
            "Native JSON support for complex data"
          ],
          impactOnProject: "Enables the bot to handle much larger Discord servers without database bottlenecks, improving reliability and user experience."
        },
        {
          name: "Redis Caching Layer",
          priority: "Medium",
          effort: "1-2 weeks",
          difficulty: "Medium",
          description: "Add Redis for caching frequently accessed data and rate limiting",
          whyWeNeed: "Reduce database queries for frequently accessed data like guild configs, user levels, and API responses. Implement distributed rate limiting.",
          howToImplement: "Set up Redis instance, implement caching decorator, cache guild configs and user levels with TTL, use Redis for rate limiting counters",
          benefits: [
            "Faster command responses (cache hits)",
            "Reduced database load",
            "Distributed rate limiting across bot instances",
            "Temporary data storage (cooldowns, sessions)"
          ],
          impactOnProject: "Significantly improves response times and enables horizontal scaling with multiple bot instances."
        }
      ]
    },
    {
      version: "2.1",
      timeline: "Q3 2026",
      theme: "Feature Enhancements",
      features: [
        {
          name: "Music Player System",
          priority: "High",
          effort: "3-4 weeks",
          difficulty: "Hard",
          description: "Add music playback with queue management, playlists, and audio filters",
          whyWeNeed: "Music is one of the most requested features for Discord bots. Adds significant value for entertainment-focused servers.",
          howToImplement: [
            "Integrate Lavalink for audio streaming",
            "Implement queue system with database persistence",
            "Create playlist management commands",
            "Add audio filters (bass boost, nightcore, etc.)",
            "Build interactive music controls with buttons"
          ],
          benefits: [
            "Play music from YouTube, Spotify, SoundCloud",
            "Queue management with skip, shuffle, loop",
            "Saved playlists per server",
            "High-quality audio streaming",
            "Volume control and audio effects"
          ],
          impactOnProject: "Makes FeXoBot a complete all-in-one bot by adding the most requested feature category.",
          codeExample: {
            title: "Music Player Command Example",
            language: "python",
            code: `@app_commands.command(name="play", description="Play music")
async def play(self, interaction: Interaction, query: str):
    voice_client = interaction.guild.voice_client
    
    if not voice_client:
        channel = interaction.user.voice.channel
        voice_client = await channel.connect(cls=wavelink.Player)
    
    tracks = await wavelink.YouTubeTrack.search(query)
    track = tracks[0]
    
    await voice_client.play(track)
    
    embed = Embed(
        title="🎵 Now Playing",
        description=f"[{track.title}]({track.uri})",
        color=Color.green()
    )
    await interaction.response.send_message(embed=embed)`
          }
        },
        {
          name: "Custom Dashboard",
          priority: "Medium",
          effort: "4-6 weeks",
          difficulty: "Hard",
          description: "Web dashboard for server configuration, statistics, and management",
          whyWeNeed: "While /setup works well, a web dashboard provides easier configuration and better visualization of server statistics and bot usage.",
          howToImplement: "Build FastAPI backend, create React frontend, implement OAuth2 Discord login, add server selection and config UI, display analytics dashboards",
          benefits: [
            "Easier server configuration via web UI",
            "View server statistics and analytics",
            "Manage warnings and tickets from web",
            "See command usage metrics",
            "Export data and reports"
          ],
          impactOnProject: "Professional appearance and easier management for server administrators."
        }
      ]
    },
    {
      version: "3.0",
      timeline: "2027",
      theme: "Enterprise Features",
      features: [
        {
          name: "Multi-Instance Sharding",
          priority: "Medium",
          effort: "2-3 months",
          difficulty: "Hard",
          description: "Implement Discord sharding for 2500+ server support",
          whyWeNeed: "Discord requires sharding when bots reach 2500 servers. Enables massive scaling.",
          howToImplement: "Implement Discord.py AutoShardedClient, set up shard coordination, distribute database load, implement IPC for cross-shard communication",
          benefits: [
            "Support for unlimited servers",
            "Better resource distribution",
            "Improved reliability (shard isolation)",
            "Horizontal scaling capability"
          ],
          impactOnProject: "Enables FeXoBot to become a public bot serving thousands of Discord servers."
        }
      ]
    }
  ],

  // Related projects with similar tech stack
  relatedProjects: [
    "FxQuest"
  ]
};

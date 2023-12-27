import { IUserQuery } from "./BardViewContext";

export interface IPromptTileConfig {
  heading: string;
  option1: IUserQuery;
  option2: IUserQuery;
  option3: IUserQuery;
}

export type IPromptTilesConfigArray = IPromptTileConfig[];

export const promptTilesConfig1: IPromptTilesConfigArray = [
  {
    heading: "Creativity",
    option1: {
      label: "Write a poem",
      description: "Write me a poem about",
      tags: ["creative"],
      mockResponse:
        "Oh, Baloo! Memories with that big, loveable lug are thicker than honey in a beehive! Picking one's like chasin' fireflies with bare hands – they all glimmer and flit\n!But there's one that shines like the moon on still water. See, we were just pups, me and Baloo, not much bigger than Bagheera's shadow. We snuck off from Mother Wolf's watchful eyes, curious as monkeys at a mango market. Stumbled into a clearing bathed in moonlight, like the jungle had spread a silver sheet for us to dance on.\nAnd that's what we did! Baloo, clumsy as a newborn elephant, kept tripping over his own paws, but his laughter would boom through the trees, sweeter than jungle berries. Me, I spun and leaped, the moonlight catching my brown fur like fireflies. We laughed till our bellies ached, and the stars peeked down at us, winkin' like old friends.",
    },
    option2: {
      label: "Craft a story",
      description: "Write me a story about",
      tags: ["storytelling"],
      mockResponse:
        "A Day of Closet Tranquility: Unveil Your Organized Oasis\nLet's breathe life into your closet, transforming it from a tangled jungle into a serene haven of self-expression. Today is a day dedicated to uncovering the joy of rediscovering your wardrobe, where every piece whispers possibilities and getting dressed becomes a delightful ritual.\nMorning: A Fresh Start with Sunlight and Song\nGreet the Day with Light: Infuse your space with natural sunshine, flinging open the windows or doors. Watch the morning light dance on potential outfits, a playful prelude to your organization symphony.\nSoundtrack Your Serenity: Let gentle music, instrumental or uplifting, fill the air. It will be your guiding melody as you declutter, each note washing away stress and paving the way for focus.",
    },
    option3: {
      label: "Generate code",
      description: "Generate code in",
      tags: ["code"],
      mockResponse:
        "A Day of Closet Tranquility: Unveil Your Organized Oasis\nLet's breathe life into your closet, transforming it from a tangled jungle into a serene haven of self-expression. Today is a day dedicated to uncovering the joy of rediscovering your wardrobe, where every piece whispers possibilities and getting dressed becomes a delightful ritual.\nMorning: A Fresh Start with Sunlight and Song\nGreet the Day with Light: Infuse your space with natural sunshine, flinging open the windows or doors. Watch the morning light dance on potential outfits, a playful prelude to your organization symphony.\nSoundtrack Your Serenity: Let gentle music, instrumental or uplifting, fill the air. It will be your guiding melody as you declutter, each note washing away stress and paving the way for focus.",
    },
  },
  {
    heading: "Information",
    option1: {
      label: "Summarize a topic",
      description: "Summarize",
      tags: ["short summary"],
      mockResponse:
        "Oh, Baloo! Memories with that big, loveable lug are thicker than honey in a beehive! Picking one's like chasin' fireflies with bare hands – they all glimmer and flit\n!But there's one that shines like the moon on still water. See, we were just pups, me and Baloo, not much bigger than Bagheera's shadow. We snuck off from Mother Wolf's watchful eyes, curious as monkeys at a mango market. Stumbled into a clearing bathed in moonlight, like the jungle had spread a silver sheet for us to dance on.\nAnd that's what we did! Baloo, clumsy as a newborn elephant, kept tripping over his own paws, but his laughter would boom through the trees, sweeter than jungle berries. Me, I spun and leaped, the moonlight catching my brown fur like fireflies. We laughed till our bellies ached, and the stars peeked down at us, winkin' like old friends.",
    },
    option2: {
      label: "Translate a language",
      description: "Translate",
      tags: ["translation"],
      mockResponse:
        "Oh, Baloo! Memories with that big, loveable lug are thicker than honey in a beehive! Picking one's like chasin' fireflies with bare hands – they all glimmer and flit\n!But there's one that shines like the moon on still water. See, we were just pups, me and Baloo, not much bigger than Bagheera's shadow. We snuck off from Mother Wolf's watchful eyes, curious as monkeys at a mango market. Stumbled into a clearing bathed in moonlight, like the jungle had spread a silver sheet for us to dance on.\nAnd that's what we did! Baloo, clumsy as a newborn elephant, kept tripping over his own paws, but his laughter would boom through the trees, sweeter than jungle berries. Me, I spun and leaped, the moonlight catching my brown fur like fireflies. We laughed till our bellies ached, and the stars peeked down at us, winkin' like old friends.",
    },
    option3: {
      label: "Answer a question",
      description: "What is",
      tags: ["Q/A"],
      mockResponse:
        "Oh, Baloo! Memories with that big, loveable lug are thicker than honey in a beehive! Picking one's like chasin' fireflies with bare hands – they all glimmer and flit\n!But there's one that shines like the moon on still water. See, we were just pups, me and Baloo, not much bigger than Bagheera's shadow. We snuck off from Mother Wolf's watchful eyes, curious as monkeys at a mango market. Stumbled into a clearing bathed in moonlight, like the jungle had spread a silver sheet for us to dance on.\nAnd that's what we did! Baloo, clumsy as a newborn elephant, kept tripping over his own paws, but his laughter would boom through the trees, sweeter than jungle berries. Me, I spun and leaped, the moonlight catching my brown fur like fireflies. We laughed till our bellies ached, and the stars peeked down at us, winkin' like old friends.",
    },
  },
  {
    heading: "Expression",
    option1: {
      label: "Write a song",
      description: "Write me a song about",
      tags: ["Talent"],
    },
    option2: {
      label: "Create a script",
      description: "Write me a script for",
      tags: ["Script writing"],
    },
    option3: {
      label: "Compose an email",
      description: "Compose an email about",
      tags: ["Emailer"],
    },
  },
];

export const promptTilesConfig2: IPromptTilesConfigArray = [
  {
    heading: "Health",
    option1: {
      label: "Find a workout for",
      description: "Suggest a workout routine to help me [goal]",
      tags: ["lose weight", "build muscle", "improve flexibility"],
    },
    option2: {
      label: "Track my fitness progress",
      description:
        "Create a chart or graph to visualize my fitness progress over time",
      tags: ["weight loss", "running pace", "strength gains"],
    },
    option3: {
      label: "Find healthy recipes for",
      description: "Show me healthy recipes that meet my dietary needs",
      tags: ["vegan", "gluten-free", "low-carb"],
    },
  },
  {
    heading: "Food",
    option1: {
      label: "Find a recipe for",
      description: "Find a delicious recipe for [dish]",
      tags: ["chicken parmesan", "chocolate chip cookies", "vegan tacos"],
    },
    option2: {
      label: "Plan a weekly meal plan",
      description: "Create a healthy and budget-friendly meal plan for me",
      tags: ["family of 4", "single person", "gluten-free diet"],
    },
    option3: {
      label: "Generate a grocery list",
      description: "Make a grocery list based on my meal plan and recipes",
      tags: ["week's worth of meals", "holiday party", "camping trip"],
    },
  },
  {
    heading: "Learning",
    option1: {
      label: "Explain a difficult concept",
      description:
        "Please explain [difficult concept] in a way that's easy to understand",
      tags: ["quantum mechanics", "organic chemistry", "calculus"],
    },
    option2: {
      label: "Create a study guide",
      description: "Generate a comprehensive study guide for [subject]",
      tags: ["history exam", "biology final", "coding interview"],
    },
    option3: {
      label: "Generate practice problems",
      description: "Create practice problems for me to work on in [subject]",
      tags: ["algebra", "physics", "French vocabulary"],
    },
  },
];

export const promptTilesConfig3: IPromptTilesConfigArray = [
  {
    heading: "Finance",
    option1: {
      label: "Create a business plan",
      description: "Help me create a business plan for a [type of business]",
      tags: ["bakery", "online clothing store", "dog walking service"],
    },
    option2: {
      label: "Write a marketing email",
      description:
        "Craft a persuasive marketing email for my [product or service]",
      tags: ["new app launch", "holiday sale", "customer loyalty program"],
    },
    option3: {
      label: "Analyze financial data",
      description: "Analyze financial data to [goal]",
      tags: ["identify trends", "forecast sales", "optimize expenses"],
    },
  },
  {
    heading: "Cozy Up",
    option1: {
      label: "Create a relaxing playlist for",
      description: "Create a relaxing playlist for [occasion]",
      tags: ["rainy day", "bath time", "movie night"],
    },
    option2: {
      label: "Recommend home decor ideas for",
      description: "Recommend home decor ideas for my [room]",
      tags: ["living room", "bedroom", "home office"],
    },
    option3: {
      label: "Generate cleaning tips for",
      description: "Generate cleaning tips for [task]",
      tags: ["deep kitchen clean", "spring cleaning", "organizing closets"],
    },
  },
  {
    heading: "Stay Informed",
    option1: {
      label: "Summarize the latest news on",
      description: "Summarize the latest news on [topic]",
      tags: ["upcoming elections", "breaking news", "world events"],
    },
    option2: {
      label: "Write a movie review for",
      description: "Write a movie review for [movie]",
      tags: [
        "newest superhero film",
        "Oscar-nominated movies",
        "critically acclaimed comedies",
      ],
    },
    option3: {
      label: "Recommend a TV show to watch based on my interests",
      description: "Recommend a TV show to watch based on my love for [genre]",
      tags: ["sci-fi", "fantasy", "comedy", "drama", "thriller"],
    },
  },
];

export const configMap: Record<string, IPromptTilesConfigArray> = {
  "1": promptTilesConfig1,
  "2": promptTilesConfig2,
  "3": promptTilesConfig3,
};

import { AssignmentVersion } from '../lib/types';

const difficultyConfig = {
  Support: {
    modifier: 'scaffolded',
    prompts: ['Graphic organizer', 'Vocabulary boost', 'Guided summary']
  },
  Core: {
    modifier: 'grade-level',
    prompts: ['Text-based response', 'Critical thinking question', 'Collaborative task']
  },
  Stretch: {
    modifier: 'enrichment',
    prompts: ['Extended analysis', 'Research connection', 'Creative application']
  }
} as const;

interface StandardInput {
  code: string;
  title: string;
  description: string;
}

export function generateAssignmentVersions(standard: StandardInput): AssignmentVersion[] {
  return (Object.keys(difficultyConfig) as Array<keyof typeof difficultyConfig>).map(
    (difficulty) => {
      const { modifier, prompts } = difficultyConfig[difficulty];
      return {
        difficulty,
        title: `${standard.title} (${difficulty})`,
        tasks: prompts.map(
          (prompt, index) =>
            `${index + 1}. Create a ${modifier} response focusing on ${prompt.toLowerCase()} for ${standard.code}.`
        ),
        points: difficulty === 'Stretch' ? 120 : difficulty === 'Core' ? 100 : 80,
        standard: standard.code
      } satisfies AssignmentVersion;
    }
  );
}

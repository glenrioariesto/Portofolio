import personal from './personal.json';
import skills from './skills.json';
import experience from './experience.json';
import projects from './projects.json';
import education from './education.json';
import showcase from './showcase.json';
import achievements from './achievements.json';

export const cvData = {
  ...personal,
  skills,
  workExperience: experience,
  projects,
  education,
  achievements
};

export const showcaseData = showcase;
export const achievementsData = achievements;

export default cvData;

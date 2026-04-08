const questions = [
{
  id: 1,
  question: "Tell me about yourself",
  answer: `
 I am a motivated and passionate individual with a strong interest in software development and problem-solving.
 I have built a solid foundation in data structures, web development, and logical thinking through academic projects.
 I have worked on projects where I applied my technical skills to solve real-world problems.
 I enjoy learning new technologies and continuously improving my skills.
 I am known for being consistent, disciplined, and focused on my goals.
 I am now looking for an opportunity where I can contribute and grow professionally.
`
},
{
  id: 2,
  question: "Why do you want to join our company?",
  answer: `
• I am impressed by your company’s strong reputation and focus on innovation.
• I have researched your recent projects and found them impactful and inspiring.
• The work culture and growth opportunities here align with my career goals.
• I believe my skills in development and problem-solving match your requirements.
• I am eager to learn from experienced professionals in your organization.
• I am confident I can contribute positively while growing with the company.
`
},
{
  id: 3,
  question: "Why should we hire you?",
  answer: `
• I have a strong foundation in technical skills and problem-solving.
• I am a quick learner and can adapt to new technologies easily.
• I am consistent, disciplined, and focused on delivering quality work.
• I bring a positive attitude and strong work ethic to the team.
• I can work both independently and collaboratively.
• I am committed to contributing effectively and continuously improving.
`
},
{
  id: 4,
  question: "What are your strengths?",
  answer: `
• One of my key strengths is problem-solving, where I break complex problems into smaller manageable parts.
• I am highly adaptable and can quickly learn new tools and technologies.
• I maintain consistency in my work, which helps me deliver reliable results.
• I have strong analytical thinking and attention to detail.
• I communicate effectively when working in teams.
• These strengths help me perform efficiently in challenging situations.
`
},
{
  id: 5,
  question: "What are your weaknesses?",
  answer: `
• One of my weaknesses is that I tend to focus too much on details.
• This sometimes slows down my overall progress.
• However, I have started setting time limits for tasks.
• I now prioritize efficiency along with accuracy.
• I continuously monitor my progress to improve productivity.
• This has significantly helped me balance quality and speed.
`
},
{
  id: 6,
  question: "Tell me about a challenge you faced",
  answer: `
• In one project, I faced an issue while integrating an external API.
• The API was not responding as expected, which delayed progress.
• I carefully analyzed documentation and debugged the issue step by step.
• I also discussed the problem with my teammates to explore solutions.
• After identifying the root cause, I implemented the fix successfully.
• This experience improved my debugging and problem-solving skills.
`
},
{
  id: 7,
  question: "Tell me about a failure",
  answer: `
• In one project, I underestimated the time required to complete tasks.
• This led to delays and affected the final timeline.
• I realized the importance of proper planning and time estimation.
• After that, I started breaking tasks into smaller steps.
• I also began tracking my progress regularly.
• This helped me improve my time management significantly.
`
},
{
  id: 8,
  question: "Where do you see yourself in 5 years?",
  answer: `
• In the next five years, I see myself as a skilled professional with strong technical expertise.
• I want to gain deep knowledge in my field and handle complex problems.
• I aim to take on more responsibilities within the organization.
• I also want to contribute to impactful and meaningful projects.
• I see myself growing along with the company.
• Ultimately, I want to become someone who adds real value.
`
},
{
  id: 9,
  question: "How do you handle pressure?",
  answer: `
• I handle pressure by staying calm and focused on the task.
• I prioritize tasks based on urgency and importance.
• I break problems into smaller manageable steps.
• I avoid panic and focus on solutions rather than problems.
• I maintain a structured approach to complete tasks efficiently.
• This helps me stay productive even in stressful situations.
`
},
{
  id: 10,
  question: "Are you a team player?",
  answer: `
• Yes, I strongly believe in teamwork and collaboration.
• I actively participate in discussions and share ideas.
• I support my teammates whenever needed.
• I value clear communication within the team.
• I focus on achieving team goals rather than individual success.
• This approach helps in delivering better results.
`
},

/* ---------- CONTINUE SAME STYLE ---------- */

{
  id: 11,
  question: "What motivates you?",
  answer: `
• I am motivated by continuous learning and improvement.
• Solving challenging problems gives me satisfaction.
• Achieving small milestones keeps me encouraged.
• I enjoy working towards clear goals.
• Being part of a productive team motivates me.
• Growth and progress are my biggest drivers.
`
},
{
  id: 12,
  question: "Describe your leadership experience",
  answer: `
• During my projects, I took initiative to guide my team.
• I helped divide tasks and manage timelines effectively.
• I ensured clear communication among team members.
• I motivated others to stay focused on goals.
• I handled challenges calmly and made decisions.
• This helped us complete the project successfully.
`
},
{
  id: 13,
  question: "How do you handle criticism?",
  answer: `
• I accept criticism positively and see it as feedback.
• I listen carefully and try to understand the issue.
• I analyze how I can improve myself.
• I apply the feedback to my future work.
• I do not take it personally but professionally.
• This helps me grow continuously.
`
},
{
  id: 14,
  question: "What do you know about our company?",
  answer: `
• I know your company is known for innovation and quality work.
• You focus on delivering impactful solutions.
• Your projects are well-recognized in the industry.
• You provide strong growth opportunities for employees.
• I have researched your recent work and achievements.
• I am impressed with your vision and culture.
`
},
{
  id: 15,
  question: "What are your career goals?",
  answer: `
• My short-term goal is to strengthen my technical skills.
• I want to gain practical industry experience.
• I aim to work on real-world challenging projects.
• In the long term, I want to take leadership responsibilities.
• I want to contribute significantly to the organization.
• Continuous growth is my main focus.
`
},
{
  id: 16,
  question: "How do you manage your time?",
  answer: `
• I plan my tasks in advance and set priorities.
• I break large tasks into smaller manageable parts.
• I focus on completing high-priority tasks first.
• I avoid distractions and stay disciplined.
• I track my progress regularly.
• This helps me stay organized and efficient.
`
},
{
  id: 17,
  question: "Describe a conflict you resolved",
  answer: `
• In a team project, there was disagreement on approach.
• I listened to both sides carefully.
• I suggested a balanced solution.
• I encouraged open communication.
• We agreed on a common approach.
• This helped us complete the project smoothly.
`
},
{
  id: 18,
  question: "Do you prefer working alone or in a team?",
  answer: `
• I am comfortable working both independently and in teams.
• I can focus well when working alone.
• I enjoy collaboration and idea sharing in teams.
• Teamwork helps achieve better results.
• I adapt based on the situation.
• Balance of both is important for success.
`
},
{
  id: 19,
  question: "What is your biggest achievement?",
  answer: `
• One of my biggest achievements was completing a complex project.
• I solved challenging problems within limited time.
• I applied my technical skills effectively.
• I stayed consistent and focused throughout.
• The project outcome was successful.
• It boosted my confidence significantly.
`
},
{
  id: 20,
  question: "What are your hobbies?",
  answer: `
• My hobbies include learning new technologies.
• I enjoy solving coding problems.
• I like exploring new ideas and concepts.
• These activities improve my skills.
• They keep me productive in my free time.
• They also help me stay curious and motivated.
`
},
{
  id: 21,
  question: "How do you handle tight deadlines?",
  answer: `
• I stay calm and focus on the most critical tasks first.
• I break the work into smaller manageable steps.
• I prioritize based on urgency and importance.
• I avoid distractions and maintain full focus.
• I communicate with the team if needed.
• This helps me complete work efficiently within deadlines.
`
},
{
  id: 22,
  question: "What do you do when you disagree with your manager?",
  answer: `
• I listen carefully to understand their perspective.
• I respectfully share my viewpoint with proper reasoning.
• I focus on finding the best solution for the task.
• I stay professional and avoid conflict.
• I am open to feedback and learning.
• Ultimately, I support the final decision.
`
},
{
  id: 23,
  question: "How do you handle repetitive tasks?",
  answer: `
• I stay focused and disciplined while performing repetitive tasks.
• I try to maintain consistency and accuracy.
• I look for ways to improve efficiency.
• I set small goals to stay motivated.
• I ensure quality is not compromised.
• This helps me stay productive even in repetitive work.
`
},
{
  id: 24,
  question: "What would you do if you made a mistake at work?",
  answer: `
• I would acknowledge the mistake immediately.
• I would analyze what went wrong.
• I would fix the issue as soon as possible.
• I would inform the concerned person if needed.
• I would learn from the mistake.
• I would take steps to avoid repeating it.
`
},
{
  id: 25,
  question: "How do you stay organized?",
  answer: `
• I plan my tasks in advance.
• I use lists or tools to track progress.
• I prioritize tasks based on importance.
• I maintain a structured workflow.
• I review my work regularly.
• This helps me stay organized and efficient.
`
},
{
  id: 26,
  question: "What do you do in your free time?",
  answer: `
• I spend time learning new technologies.
• I solve coding or logical problems.
• I explore new ideas and concepts.
• I also relax to maintain balance.
• I focus on activities that improve me.
• This helps me stay productive and refreshed.
`
},
{
  id: 27,
  question: "How do you deal with difficult teammates?",
  answer: `
• I stay calm and professional.
• I try to understand their perspective.
• I communicate clearly and respectfully.
• I focus on common goals.
• I avoid unnecessary conflicts.
• This helps maintain a healthy work environment.
`
},
{
  id: 28,
  question: "What do you do when you feel stuck on a problem?",
  answer: `
• I break the problem into smaller parts.
• I revisit the basics and analyze carefully.
• I try different approaches.
• I take a short break to refresh my mind.
• I seek help if needed.
• This helps me find effective solutions.
`
},
{
  id: 29,
  question: "How do you handle multiple projects?",
  answer: `
• I prioritize projects based on deadlines.
• I create a clear plan for each project.
• I allocate time efficiently.
• I track progress regularly.
• I avoid multitasking confusion.
• This helps me manage multiple tasks effectively.
`
},
{
  id: 30,
  question: "What is your approach to learning new skills?",
  answer: `
• I start by understanding the basics.
• I practice regularly to build confidence.
• I work on small projects.
• I learn from online resources.
• I apply what I learn in real scenarios.
• This helps me learn effectively.
`
},

{
  id: 31,
  question: "How do you react to feedback from seniors?",
  answer: `
• I listen carefully to feedback.
• I understand areas of improvement.
• I apply suggestions in my work.
• I stay positive and open-minded.
• I ask questions if needed.
• This helps me improve continuously.
`
},
{
  id: 32,
  question: "What does teamwork mean to you?",
  answer: `
• Teamwork means working towards a common goal.
• It involves communication and collaboration.
• It requires trust among team members.
• Everyone contributes their strengths.
• It improves efficiency and results.
• I value teamwork highly.
`
},
{
  id: 33,
  question: "How do you ensure accuracy in your work?",
  answer: `
• I pay attention to details.
• I double-check my work.
• I test solutions before finalizing.
• I follow structured approaches.
• I avoid rushing tasks.
• This ensures high-quality results.
`
},
{
  id: 34,
  question: "What would you do if you had no guidance for a task?",
  answer: `
• I would analyze the task requirements.
• I would research possible solutions.
• I would try solving it step by step.
• I would use available resources.
• I would ask for help if needed.
• This helps me stay productive.
`
},
{
  id: 35,
  question: "How do you handle interruptions while working?",
  answer: `
• I stay focused on priorities.
• I handle urgent interruptions quickly.
• I return to my task immediately.
• I minimize distractions.
• I manage time effectively.
• This keeps my productivity high.
`
},
{
  id: 36,
  question: "What is your biggest professional goal?",
  answer: `
• My goal is to become highly skilled in my field.
• I want to work on impactful projects.
• I aim to continuously improve myself.
• I want to take on responsibilities.
• I want to contribute meaningfully.
• Growth is my primary goal.
`
},
{
  id: 37,
  question: "How do you handle unexpected situations?",
  answer: `
• I stay calm and composed.
• I quickly analyze the situation.
• I focus on possible solutions.
• I adapt to changes.
• I take action efficiently.
• This helps me handle challenges well.
`
},
{
  id: 38,
  question: "What do you do to improve your communication skills?",
  answer: `
• I practice speaking clearly.
• I listen actively to others.
• I learn from feedback.
• I participate in discussions.
• I work on expressing ideas better.
• This improves my communication.
`
},
{
  id: 39,
  question: "How do you measure your performance?",
  answer: `
• I track my progress regularly.
• I compare results with goals.
• I identify areas of improvement.
• I seek feedback from others.
• I focus on continuous improvement.
• This helps me grow consistently.
`
},
{
  id: 40,
  question: "What do you do when you lack motivation?",
  answer: `
• I remind myself of my goals.
• I break tasks into smaller parts.
• I start with small steps.
• I take short breaks if needed.
• I stay disciplined.
• This helps me regain motivation.
`
},

{
  id: 41,
  question: "How do you approach problem-solving in a team?",
  answer: `
• I listen to all team members’ ideas.
• I analyze different approaches.
• I contribute my suggestions.
• I support collaborative decisions.
• I focus on the best solution.
• This improves team outcomes.
`
},
{
  id: 42,
  question: "What would you do if you missed a deadline?",
  answer: `
• I would acknowledge the delay.
• I would communicate with my manager.
• I would explain the situation honestly.
• I would complete the task quickly.
• I would learn from the mistake.
• I would improve planning next time.
`
},
{
  id: 43,
  question: "How do you maintain work-life balance?",
  answer: `
• I manage my time effectively.
• I set clear priorities.
• I take breaks when needed.
• I avoid overworking.
• I focus on both work and personal life.
• This keeps me balanced and productive.
`
},
{
  id: 44,
  question: "What do you do when you receive unclear instructions?",
  answer: `
• I ask for clarification.
• I try to understand the requirements.
• I confirm expectations.
• I avoid assumptions.
• I communicate clearly.
• This helps avoid mistakes.
`
},
{
  id: 45,
  question: "How do you stay focused during long tasks?",
  answer: `
• I break tasks into smaller parts.
• I set short goals.
• I take short breaks.
• I avoid distractions.
• I stay disciplined.
• This keeps me focused.
`
},
{
  id: 46,
  question: "What role do you play in resolving team issues?",
  answer: `
• I listen to all perspectives.
• I encourage open communication.
• I suggest fair solutions.
• I stay neutral and calm.
• I focus on team goals.
• This helps resolve conflicts.
`
},
{
  id: 47,
  question: "How do you ensure continuous improvement?",
  answer: `
• I learn from past experiences.
• I seek feedback regularly.
• I practice consistently.
• I stay updated with trends.
• I set improvement goals.
• This helps me grow steadily.
`
},
{
  id: 48,
  question: "What do you do when you feel overwhelmed?",
  answer: `
• I pause and organize my tasks.
• I prioritize important work.
• I break tasks into smaller steps.
• I stay calm and focused.
• I avoid panic.
• This helps me regain control.
`
},
{
  id: 49,
  question: "How do you handle responsibility?",
  answer: `
• I take ownership of my tasks.
• I stay accountable for results.
• I complete work with dedication.
• I communicate progress clearly.
• I ensure quality output.
• This builds trust.
`
},
{
  id: 50,
  question: "What do you expect from your team?",
  answer: `
• I expect clear communication.
• I value mutual respect.
• I expect collaboration.
• I believe in shared goals.
• I support teamwork.
• This leads to success.
`
}

];
export default questions;
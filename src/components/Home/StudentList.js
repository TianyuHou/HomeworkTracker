import React from 'react';
import StudentItem from './StudentItem';

const StudentList = () => (
  <div className="student-list">
    <StudentItem
      id="s1"
      name="Lester Riley"
      school="Northeastern University"
      date="06/27/2017"
      comment={`"F2E gave me an opportunity to continue my study and find a great job after I graduated. What’s more, my mentor and I became really good friends and now I prepare to become a mentor for F2E as well!"`}
    />
    <StudentItem
      id="s2"
      name="Everett Shaw"
      school="Stanford University"
      date="05/30/2017"
      comment={`"Stanford is my dream school, but as an international student, the tuition fee is just not affordable for me. Then my brother, a previous F2E student, who is now an F2E mentor, told me “try this one”. F2E is really helpful to me, especially my mentor. Because of him, I am totally interested in programing. Now I am working for Amazon!"`}
    />
    <StudentItem
      id="s3"
      name="Bob Walters"
      school="Harvard University"
      date="06/30/2016"
      comment={`"My friends recommended this program to me. F2E is a magic wand that makes my dream -- to pursue a higher education at my dream school and complete my master degree -- come true."`}
    />
    <StudentItem
      id="s4"
      name="Kristen Alvarez"
      school="Cornell University"
      date="05/15/2016"
      comment={`"Thanks to F2E, I get to become a successful lawyer now.  They helped me to accomplish my program and guided me with my career path. A few years later I think I will be ready to be a donor for F2E!"`}
    />
  </div>
);

export default StudentList;

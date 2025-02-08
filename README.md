# GCET Outcome-Based Education Platform
  
## Abstract
GCET Outcome-Based Education Platform aims to host a structured, automated system for tracking and calculating student learning achievements across various academic courses. Designed for academic administrators and faculty, this system facilitates accurate, consistent, and efficient monitoring of course outcomes (COs) and their mapping to broader program outcomes (POs), which are pre-defined by the National Board of Accreditation (NBA). By aligning individual course-level achievements with overarching program goals, this tool empowers educators to improve instructional quality and better prepare students to meet career and societal demands. The existing process of manual data entry and attainment calculations is prone to human error, making it challenging to maintain accurate records, especially for regulations that change periodically. Our proposed system addresses these limitations by automating the collection and analysis of student marks, mapping them to COs, and calculating attainment levels based on rubric-based assessments. It leverages a tech stack comprising React, Node.js, HTML, CSS, Bootstrap, and MongoDB to streamline operations and ensure minimal manual intervention. Using this system, administrators can oversee attainment levels across multiple courses, while faculty can upload marks with greater security and reduced risk of error. The automated calculation of CO and PO attainments, followed by their alignment with the learning objectives, enables a more cohesive approach to tracking and improving academic quality and graduate preparedness. Ultimately, the project provides a scalable framework for academic institutions, fostering a culture of continuous improvement.

## Existing System
* The existing system is as follows and has few issues with obtaining Outcome-Based Attainments for all the courses of a given regulation:
  - The course outcomes and CO-PO mappings of a course in the current regulation are being consecutively used by the faculty coordinators of upcoming semesters; while they keep changing for every new regulation. It is causing an issue of making a record of attainments properly.
  - Providing access to the confidential Excel sheets to the faculty to enter the student marks, is causing a problem again due to human errors, layout changes, accidental data deletion, modification of marks, etc. The admin must re-check for correctness of every aspect which is a tiresome task.
  - The calculation formulae related to every course rubric are explicitly written by the admin according to the type of course and what rubric is considered. This in itself is a huge task and is burdensome for the admin to manage the same for all the courses in the regulation. 

## Proposed System
* The proposed system will contain the following:
  - Admin-privileged system to maintain the Course Attainments. 
  - Admin will assign COs and CO-PO mappings to courses and then map each course with a course coordinator.
  - Faculty access is provided to upload the marks obtained by students for those rubrics.
* The proposed system will automate the entire process – from calculating the percentages for each rubric to calculating the level of attainments and then mapping them with the CO-PO table. 
  - Also, with a few more averaging operations, the overall attainments are obtained for all COs.
  - This system will help the admin to efficiently maintain the course attainments with minimum (or) no human error. Automation of this calculation process will help coordinators and admins streamline the academic regulation works in an easier way. 

## Hardware Requirements
1. Processor: Intel Core i5 or higher (or equivalent)
2. RAM: 16 GB
3. Storage: At least 100 GB of free space (SSD recommended for faster performance)
4. Display: 1366 x 768 resolution or higher
5. Internet Connectivity: For development and testing
6. Peripherals: Standard keyboard, mouse, and monitor

## Softwares Used:
1. Operating System: Windows 10
2. Code Editor/IDE: Visual Studio Code
3. Backend Framework: Node.js with Express.js
4. Frontend Libraries/Frameworks: React.js, HTML, CSS, Bootstrap
5. Database: MongoDB
6. Version Control: Git (with GitHub)
7. Package Manager: npm
8. Browser: Google Chrome
9. Runtime Environment: Node.js (version 14.x or higher)
10. Security Libraries: bcrypt

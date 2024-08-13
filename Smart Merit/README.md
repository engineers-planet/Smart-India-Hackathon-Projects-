# Team : DigIndia (11702)

Smart India Hackathon 2018

Identification of meritorious students in primary education



Problem Statement:-

Gujarat government has nearly 90 lac students studying in primary education across state. They are in different cities and villages across state. There is no mechanism to identify bright students who are performing well in study, sports or other activities. Web portal can be designed to acquire date about such students and can be analyzed on different parameters. What Exact Problem is being solved? : Such identified students can be provided with extra resources or special attention can be given to their upbringing.

Abstract 

To identify meritorious students firstly all the educational institutions need to upload the results of students as well as points of extra curriculum activity (activity name, score out of 10 for performance) to the database for a student according to the current class of study.
Aadhar number for all the students will always be given (from there students details will be verified).A parent or any other nongovernment institute can also upload scanned copy of result or certificate of any student with his/her Aadhar number and their own details. Admin will
Cross-check and verify it for the update in the database. One’s (schools and institutions) first login or registration, there will be a unique token, (user id and password) to the Portal. That login will be further verified. So every institution will have a unique user id and password and students' details will be uploaded yearly and updates will be done twice in a year. 

The second fold of the solution is to sort the data according to the merit of students. The designed application will perform the operation with the provided data and present a lesser (according to requirement) students' details. There should be some methods (a faster and optimal Algorithm to sort data by marks and activity score from database Base will be adopted i.e., any tree type-level representation) to sort the data (details) of meritorious students from provided records of all the students.

The third and final part is providing the list of meritorious students to the education department and university. Each official and university will also have a login section. The list of meritorious students will be provided according to year, required field. The education department
or university can also post the facilities provided to the selected and shortlisted student as a notice.

Therefore, we are going to solve the stated problem by providing a Web-based application comprising of Web portal and secured database to identify meritorious students in primary education according to data (100%) uploaded and retrieved from several institutions and selected meritorious students list will be provided to (according to specification of different facilities 20-30%) to Education Department and Universities.

Keywords: 

1)	Aadhar Number as Primary key of Student Table.
2)	Online WEB-portal.
3)	Update Records every year to keep a check on the improvement, Standardization & Soring data based on Z – stat to filter out the meritorious students on the basis of acads and extra-curricular activities.
4)	Tree type-level representation of Database i.e. Admin – Institute – Student.
 Use Case :-
1)	Choice Based selection of meritorious student from data set. For instances if the requirement is only limited to academics, they can refer to the website to fetch a list of top scorers say top 100 or top 200 students. Again if the requirement is limited to selection of Extra-curricular activity like – singing, painting, dancing etc they can fetch the list of students having expertise in that particular field only.
2)	Identification of poor meritorious students and Funding based support from different NGO’s, organizations and donations if they want to provide. 
3)	Supervising data based on entries done in every year (Region based) to keep a check on the individual growth of a student. For instances, a diligent student say X has been receiving scholarship every year now say that X student’s data has not been registered in Database in the next year. Thus there is a decay of GDP in the sample space.
4)	To highlight the social issues such as Child Labour, child trafficking, by year wise regulation Data.
5)	To prevent the girl child marriage on the basis of Dataset by the investigation Team. For instance if a girl found not registering in the consecutive Year, an investigation team can take action accordingly.
Special Features:
	The school should submit their data to get a recognition as well as to be in sight of fund providing parties (governmental or non-governmental). Students will be benefited as direct communication is in between officials and student and no middle man in between.
•	Data analysis will be the key point to identification using assignment of z-marks by standard normal distribution. 



Technology Stack:

We are to make a Web-based app, in a microlithic structure format, where the app structure is broken into different fragments, which does the different job. One part will be taking in the to the database from a web portal designed using CSS, JavaScript, PHP, and Servlet. Computation of the sorted data and the various mathematical calculations i.e. arranging the sorted data according to given criteria etc on a mathematical platform powered by JAVA. Another part will be integrated with the API's of various Education Department and Universities to provide them up with shortlisted meritorious students, integrating with their personal choices and cut-offs, and also where shortlisted students will be notified by notice posted. Keeping in mind the ease of obtaining marks and details which has increased throughout the years. In the web app, after one's first login or registration, each part of the education department, university and institution have a unique token, (user id and password) to the database. Coming to the part of its database, My SQL or Oracle or Mongo DB can be used with a firmed dashboard powered by python
or JavaScript on a network frame. Since the app will be containing huge academic details of many students, so a strong encryption algorithm is to be used for data integrity and data security. AES-256 or MD5 would be best to use to protect the data in the database and for authentication Biometric data will also be preserved.

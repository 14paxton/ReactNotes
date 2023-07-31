export const fetchGolfCourses = async () => {
    const availableCourseList = Object.create(availableCourseObject)
    const courseList = await getTestCourseInfo().then(courses => {
        return courses.map(course => {
            if (course?.holes) {
                const {holes} = course

                //temp create unique id for hole/course relationship
                 holes.forEach(hole =>{
                    const newId = (hole.id + course.id) * Math.floor(Math.random() * (599 - 4 )) + 1;
                     hole.id = newId
                })


                course.holes = holes.sort((a, b) => {
                    return a?.hole < b?.hole
                           ? -1
                           : 1;
                })
            }
            return {
                id:            course?.id,
                name:          `${course?.name?.toLowerCase()?.replace(/\s/g, '')}`,
                displayOption: `${course?.name}`,
                holes:         course.holes
            };
        })
    })

    availableCourseList.choices = courseList
    return availableCourseList;
};


const testHoleData = [
    {id: 1, hole: 4, yardage: 850, par: 4, advertiser: 'True Value'},
    {id: 2, hole: 7, yardage: 50, par: 3, advertiser: 'True Value'},
    {id: 3, hole: 1, yardage: 150, par: 3, advertiser: 'True Value'},
    {id: 4, hole: 2, yardage: 250, par: 4, advertiser: 'True Value'},
    {id: 5, hole: 8, yardage: 175, par: 4, advertiser: 'True Value'},
    {id: 6, hole: 3, yardage: 650, par: 5, advertiser: 'True Value'},
    {id: 7, hole: 9, yardage: 890.56, par: 5, advertiser: 'True Value'},
    {id: 8, hole: 6, yardage: 250, par: 5, advertiser: 'True Value'},
    {id: 9, hole: 5, yardage: 50, par: 3, advertiser: 'True Value'},
]


async function getTestCourseInfo() {
    return [
        {id: 1, name: "Holmes Lake", holes: testHoleData},
        {id: 2, name: "Augusta National", holes: testHoleData},
        {id: 3, name: "Pine Valley", holes: testHoleData},
        {id: 4, name: "Pebble Beach", holes: testHoleData},
    ]

}


export const availableCourseObject = {
    id:      'availableCourses',
    type:    'combo',
    label:   "Available Courses",
    choices: [],
    rules:   {required: 'You need to pick a course.'}
};

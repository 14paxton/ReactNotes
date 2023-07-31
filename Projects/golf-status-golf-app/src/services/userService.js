export const fetchAvailableUsers = async () => {
    // const response = await fetchData(RUBY_FETCH_MOVIE_LIST);


    const userList = await getTestUsers().then(response => {
        return response?.length
               ? response
               : [];
    })

    return userList

};

export const getUsersSelectionList = async () => {
    const availableUsersList = Object.create(availableUsersObject)
    const formatedUserList = await fetchAvailableUsers().then(users => {
        if (users) {
            return users.map(user => {
                return {
                    id:            user?.id,
                    name:          `${user?.firstName} ${user?.lastName}`,
                    displayOption: `${user?.firstName} ${user?.lastName}`,
                    selectOption:  `${user?.firstName} ${user?.lastName} / ${user?.userName}`,
                };
            })
        }


    })
    availableUsersList.choices = formatedUserList
    return availableUsersList
}


async function getTestUsers() {
    return [
        {id: 1, firstName: "Ty", lastName: "Webb", userName: 'tWebb'},
        {id: 2, firstName: "Al", lastName: "Czervik", userName: 'aCZ56789'},
        {id: 3, firstName: "Chubbs", lastName: "Peterson", userName: 'chubbyPeter'},
        {id: 4, firstName: "Rannulph", lastName: "Junuh", userName: 'ranJu'},
        {id: 5, firstName: "Danny", lastName: "Noonan", userName: 'danNo'},
        {id: 6, firstName: "Shooter", lastName: "McGavin", userName: 'shootM'},
        {id: 7, firstName: "Happy", lastName: "Gilmore", userName: 'hGilmore'},
    ]

}

export const availableUsersObject = {
    id:      'availableUsers',
    type:    'combo',
    label:   "Available Users",
    choices: [],
    rules:   {required: 'You need to select at least 1 golfer.'}
}

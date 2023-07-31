deployed at https://dashboard.heroku.com/apps/ruby-movies

modified to golf status app


current object structurs

const user = {id: 1, firstName: "Ty", lastName: "Webb", userName: 'tWebb'}

const savedScoreCard = {user: user, competitors : [user, user, user], scores: ""}




const hole = {id: 1, hole: 4, yardage: 850, par: 4, advertiser: 'True Value'}

const course = {id: 1, name: "Holmes Lake", holes: [hole, hole, hole]}



scores would be saved as json string

{
    "Augusta National": {
        "5093915": [
            null,
            null,
            "6",
            "6"
        ],
        "33010604077": [
            null,
            null,
            "0",
            "7"
        ],
        "9973740751": [
            null,
            null,
            "3",
            null
        ],
        "16187038346": [
            null,
            null,
            "3",
            null
        ],
        "37963897726": [
            null,
            null,
            null,
            null
        ],
        "5942823428": [
            null,
            null,
            null,
            null
        ],
        "44962288831": [
            null,
            null,
            null,
            null
        ],
        "19111909931": [
            null,
            null,
            null,
            null
        ],
        "57725152444": [
            null,
            null,
            null,
            null
        ]
    }
}

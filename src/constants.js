export const HEADERS = [
    {
        text: 'User story',
        align: 'center',
        sortable: false,
        value: 'name'
    },
    {text: 'task 1', value: 'property1'},
    {text: 'task 2', value: 'property2'},
    {text: 'task 3', value: 'property3'}
];

export const USER_STORIES = [
    {
        name: 'user story 1',
        property1: 15,
        property2: 6,
        property3: 24
    },
    {
        name: 'user story 2',
        property1: 23,
        property2: 9,
        property3: 37
    },
    {
        name: 'user story 3',
        property1: 26,
        property2: 16,
        property3: 23
    }
];

export const HEADERS1 = [
    {
        text: 'Team Members',
        align: 'center',
        sortable: true,
        value: 'name'
    },
    {text: 'Sprint 1', value: 'property1'},
    {text: 'Sprint 2', value: 'property2'},
    {text: 'Sprint 3', value: 'property3'}
];

export const MEMBERS = [
    {        name: 'Abigail',        property1: 10,        property2: 5,        property3: 8    },
    {        name: 'James',        property1: 10,        property2: 6,        property3: 8    },
    {        name: 'John',        property1: 10,        property2: 6,        property3: 8    },
    {        name: 'Anna',        property1: 10,        property2: 5,        property3: 8    },
    {        name: 'Lucy',        property1: 10,        property2: 5,        property3: 8    }

];

export const PROCESSES = [
    30,
    45,
    60,
    75,
    90
];

export const COMPLEXITY = [
    90
];

export const GRADIENT = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea']
];

export const PIEDATA = [
    [
        ['Contribution', 'commits'],
        ['member 1', 2],
        ['member 2', 3],
        ['member 3', 4],
        ['member 4', 5],
        ['member 5', 3]
    ],
    [
        ['Contribution', 'commits'],
        ['member 1', 30],
        ['member 2', 50],
        ['member 3', 40],
        ['member 4', 30],
        ['member 5', 10]
    ]

];

export const TIMELINE = [
    [
        ['Sprint', 'member 1', 'member 2', 'member 3', 'Total'],
        ['sprint 1',  12,     14,      10,             36],
        ['sprint 2',  17,     14,      12,             43],
        ['sprint 3',  14,     17,      25,             56]
    ],
    [
        ['Sprint', 'member 1', 'member 2', 'member 3', 'Total'],
        ['sprint 1',  5,      6,        8,             19],
        ['sprint 2',  7,      4,        6,             17],
        ['sprint 3',  7,      7,        5,             19]
    ]

];

export const CodeQuality = {
    header1: [
        {
            text: 'Member',
            align: 'center',
            sortable: false,
            value: 'name',
        },
        {
            text: 'Code Quality',
            value: 'codeQuality'
        }
    ],
    data1: [
        { name: 'Abigail',     codeQuality: 90},
        { name: 'James',       codeQuality: 70},
        { name: 'John',        codeQuality: 80},
        { name: 'Anna',        codeQuality: 60},
        { name: 'Lucy',        codeQuality: 90}
    ],
    header2: [
        {
            text: 'File Name',
            align: 'center',
            sortable: false,
            value: 'name'
        },
        {
            text: 'Code Quality',
            value: 'codeQuality'
        }
    ],
    data2: [
        { name: 'SyntaxAwareDocument.java',        codeQuality: 90},
        { name: 'IOAgent.java',        codeQuality: 80},
        { name: 'PathDB.java',        codeQuality: 70},
        { name: 'KeywordDB.java',        codeQuality: 60},
        { name: 'ToJson.java',        codeQuality: 80},
        { name: 'FindDialog.java',        codeQuality: 70},
        { name: 'FontFrame.java',        codeQuality: 60},
        { name: 'IntroFrame.java',        codeQuality: 90},
        { name: 'TextEditorUI.java',        codeQuality: 70},
        { name: 'TextLineNumber.java',        codeQuality: 30},
    ],
};

export const COURSES = [
    {
        name: 'ser 001',
        projects:[
            {
                name: 'project 1',
                githubSlug: '',
                taigaSlug:'',
                description: 'here is the description about project 1'
            },
            {
                name: 'project 2',
                githubSlug: '',
                taigaSlug:'',
                description: 'here is the description about project 2'
            }
        ]
    },
    {
        name: 'ser 002',
        projects:[
            {
                name: 'project 3',
                githubSlug: '',
                taigaSlug:'',
                description: 'here is the description about project 1'
            },
            {
                name: 'project 4',
                githubSlug: '',
                taigaSlug:'',
                description: 'here is the description about project 2'
            }
        ]
    },
];

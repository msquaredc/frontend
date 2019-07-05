import shuffle from './utils'
let Project = class Project {
    constructor() {
        this.active = 'zeroth'
        this.steps = {
            zeroth: false,
            first: false,
            second: false,
            third: false,
        }
        this.table = {
            content: {},
            header: [],
        }
        this.relevant_headers = []
        this.question = {}
        this.answer = []
        this.codingTimeline = new Timeline()
    }
    getAllIrrelevantHeaders() {
        let hset = new Set(this.table.header)
        let rset = new Set(this.relevant_headers)
        return [...hset].filter(x => !rset.has(x))
    }
    getCurrentQuestion() {
        this.relevant_headers.forEach(oldQuestion => {
            this.question[oldQuestion].forEach(newQuestion => {
                if ((oldQuestion, newQuestion) in this.answer) {
                    let s = new Set(this.answer[oldQuestion][newQuestion].keys())
                    let s2 = new Set(this.table)
                }
            })
        })
    }
    getProgress() {
        let count = 0;
        for (var i = 0; i < this.codingTimeline.all().length; ++i) {
            if (this.codingTimeline.all()[i].done)
                count++;
        }
        return count
    }
    getResponses(column) {
        let result = new Set();
        this.table.content.forEach(row => {
            result.add(row[column])
        })
        return result
    }
    getIrrelevantHeader(colum, response) {
        let res = []
        this.table.content.forEach(row => {
            if (row[colum] == response) {
                let tmp = {}
                this.getAllIrrelevantHeaders().forEach(header => {
                    tmp[header] = row[header]
                })
                res.push(tmp)
            }
        })
        return res
    }
    setQuestions(columns) {
        columns.forEach(column => {
            shuffle(this.getResponses(column)).forEach(response => {
                this.codingTimeline.append(new Coding(column, response, this.question[column]))
            })
        })
    }
    fromObject(obj) {
        let p = new Project()
        console.log(obj)
        p.active = obj.active
        p.steps = obj.steps
        p.table = obj.table
        p.relevant_headers = obj.relevant_headers
        p.question = obj.question
        p.answer = obj.answer
        p.codingTimeline = new Timeline().fromObject(obj.codingTimeline)
        return p
    }
    export() {
        let res = {}
        this.codingTimeline.all().forEach(responseCoding => {
            this.getIrrelevantHeader(responseCoding.question, responseCoding.response).forEach(actualRow => {
                responseCoding.coding_questions.forEach(codingQuestion => {
                    let tmp = {}
                    project.getAllIrrelevantHeaders().forEach(irrelevantHeader => {
                        tmp[irrelevantHeader] = actualRow[irrelevantHeader]
                    })
                    tmp["done"] = responseCoding.done
                    tmp["question"] = responseCoding.question
                    tmp["response"] = responseCoding.response
                    tmp["codingQuestion"] = codingQuestion.show
                    tmp["codingAnswer"] = codingQuestion.ask.model
                    res.push(tmp)
                })
            })
        })
        return res
    }
}

let Timeline = class Timeline {
    constructor() {
        this.previous = []
        this.current = null
        this.next = []
    }
    isDone() {
        this.previous.forEach(element => {
            if (!element.done) {
                return false
            }
        })
        this.next.forEach(element => {
            if (!element.done) {
                return false
            }
        })
        if (!this.current) {
            return false
        }
        else {
            if (!this.current.done) {
                return false
            }
        }
        return true
    }
    fromObject(obj) {
        this.previous = obj.previous
        this.current = obj.current
        this.next = obj.next
        return this
    }
    moveForwards(current) {
        if (current) {
            current.done = true
            if (this.next.length > 0) {
                this.previous.push(current)
                this.current = this.next.pop()
            }
            else {
                this.current = current
            }
        }
        return this
    }
    moveBackwards(current) {
        if (current) {
            current.done = true
            if (this.previous.length > 0) {
                this.next.push(current)
                this.current = this.previous.pop()
            }
            else {
                this.current = current
            }
        }
        return this
    }
    currentIndex() {
        return this.previous.length
    }
    length() {
        return this.previous.length + 1 + this.next.length
    }
    proximity() {
        return [...Array(this.length).keys()].slice(Math.max(this.currentIndex() - 2, 0), Math.min(this.currentIndex() + 2), this.length() - 1)
    }
    append(element) {
        if (!this.current) {
            this.current = element
        }
        else {
            this.next.unshift(element)
        }
    }
    appendAll(elementList) {
        elementList.forEach(element => {
            this.append(element)
        })
    }
    all() {
        if (this.current) {
            return this.previous.reverse().concat([this.current]).concat(this.next)
        }
        else {
            return []
        }
    }
}

let Coding = class Coding {
    constructor(question, response, coding_questions) {
        this.done = false
        this.question = question
        this.response = response
        this.coding_questions = coding_questions
        this.coding_answers = []
    }
}

export { Timeline, Project, Coding };
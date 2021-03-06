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
        this.codingTimeline = []
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
        let count = this.codingTimeline.reduce(function (n, codingQuestion) {
            return n + (codingQuestion.done == true);
        }, 0);
        return count * 100 / this.codingTimeline.length
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
                this.codingTimeline.push(new Coding(column, response, this.question[column]))
            })
        })
    }
    fromObject(obj) {
        let p = new Project()
        p.active = obj.active
        p.steps = obj.steps
        p.table = obj.table
        p.relevant_headers = obj.relevant_headers
        p.question = obj.question
        p.answer = obj.answer
        p.codingTimeline = obj.codingTimeline
        return p
    }
    isDone() {
        return this.getProgress() == 100
    }
    *export(done) {
        let responseCoding;
        for (responseCoding of this.codingTimeline) {
            let actualRow;
            for (actualRow of this.getIrrelevantHeader(responseCoding.question, responseCoding.response)) {
                let codingQuestion;
                for (codingQuestion of responseCoding.coding_questions) {
                    let tmp = {}
                    let irrelevantHeader
                    for (irrelevantHeader of this.getAllIrrelevantHeaders()) {
                        tmp[irrelevantHeader] = actualRow[irrelevantHeader]
                    }
                    if (done) {
                        tmp["done"] = responseCoding.done
                    }
                    tmp["question"] = responseCoding.question
                    tmp["response"] = responseCoding.response
                    tmp["codingQuestion"] = codingQuestion.show
                    tmp["codingAnswer"] = codingQuestion.ask.model
                    yield tmp
                }
            }
        }
    }
}

/* let Timeline = class Timeline {
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
        console.log("Timeline.currentIndex()")
        return this.previous.length
    }
    setCurrentIndex(index) {
        console.log("Timeline.setCurrentIndex()-> " + index)
        if (index >= 0 && index < this.length) {
            while (this.currentIndex() < index) {
                const temp = this.current
                this.current = this.next.pop()
                this.previous.push(temp)

            }
            while (this.currentIndex() > index) {
                const temp = this.current
                this.current = this.previous.pop()
                this.next.push(temp)

            }
        }
    }
    lengthMethod() {
        return this.previous.length + 1 + this.next.length
    }
    proximity() {
        console.log("Timeline.proximity() -->Start")
        let res = []
        let dist;
        const index = this.currentIndex()
        let amount = Math.min(this.lengthMethod(), 5)
        res.push(index)
        for (dist = 1; res.length < amount; dist++) {
            if (index - dist >= 0) {
                res.unshift(index - dist)
            }
            if (index + dist < this.lengthMethod()) {
                res.push(index + dist)
            }
        }
        console.log("Timeline.proximity() --> End")
        return res
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
            let tmp = this.previous.slice().reverse()
            return tmp.concat([this.current]).concat(this.next)
        }
        else {
            return []
        }
    }
    getByIndex(index) {
        this.setCurrentIndex(index)
        return this.all()[index]
    }
    setByIndex(index, value) {
        this.setCurrentIndex(index)
        this.current = value
        console.log(this.current)
    }
} */

let Coding = class Coding {
    constructor(question, response, coding_questions) {
        this.done = false
        this.question = question
        this.response = response
        this.coding_questions = coding_questions
        this.coding_answers = []
    }
}

export { Project, Coding };
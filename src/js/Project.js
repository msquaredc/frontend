import shuffle from './utils'
let Project = class Project{
    constructor(){    
      this.id = null;
      this.active = 'zeroth'
      this.steps = {
          zeroth: false,
          first: false,
          second: false,
          third: false,
        }
      this.table = {
          content:null,
          header:null,
        },
      this.relevant_headers = [],
      this.question = {}
      this.answer = []
      this.codingTimeline = new Timeline()
    }
    getCurrentQuestion(){
      this.relevant_headers.forEach(oldQuestion =>{
        this.question[oldQuestion].forEach(newQuestion =>{
          if ((oldQuestion,newQuestion) in this.answer){
            let s = new Set(this.answer[oldQuestion][newQuestion].keys())
            let s2 = new Set(this.table)
          }
        })
      })
    }
    getResponses(column){
      let result = new Set();
      this.table.content.forEach(row => {
        result.add(row[column])
      })
      return result
    }
    setQuestions(columns){
        columns.forEach(column =>{
            shuffle(this.getResponses(column)).forEach(response =>{
                this.codingTimeline.append(new Coding(column, response, this.question[column]))
            })
        })
    }
}

let Timeline = class Timeline{
    constructor(){
        this.previous = []
        this.current = null
        this.next = []
    }
    isDone(){
        this.previous.forEach(element =>{
            if (!element.done){
                return false
            }
        })
        this.next.forEach(element =>{
            if (!element.done){
                return false
            }
        })
        if(!this.current.done){
            return false
        }
        return true
    }
    fromObject(obj){
        this.previous = obj.previous
        this.current = obj.current
        this.next = obj.next
        return this
    }
    moveForwards(current){
        current.done = true
        if (this.next.length > 0){
            this.previous.push(current)
            this.current = this.next.pop()
        }
        else{
            this.current = current
        }
        return this
    }
    moveBackwards(current){
        current.done = true
        if (this.previous.length > 0){
            this.next.push(current)
            this.current = this.previous.pop()
        }
        else{
            this.current = current
        }
        return this
    }
    currentIndex(){
        return this.previous.length
    }
    length(){
        return this.previous.length + 1 + this.next.length
    }
    proximity(){
        return [...Array(this.length).keys()].slice(Math.max(this.currentIndex()-2,0),Math.min(this.currentIndex()+2),this.length()-1)
    }
    append(element){
        if (!this.current){
            this.current = element
        }
        else{
            this.next.unshift(element)
        }
    }
    appendAll(elementList){
        elementList.forEach(element =>{
            this.append(element)
        })
    }
}

let Coding = class Coding{
    constructor(question,response, coding_questions){
        this.done = false
        this.question = question
        this.response = response
        this.coding_questions = coding_questions
        this.coding_answers = []
    }
}

export {Timeline, Project, Coding};
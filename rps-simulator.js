function colliding(div1, div2) {
    // Get the position and dimensions of each div
    const div1Rect = div1.getBoundingClientRect();
    const div2Rect = div2.getBoundingClientRect();
  
    // Check for collisions between the divs
    return !(
      div1Rect.right < div2Rect.left ||
      div1Rect.left > div2Rect.right ||
      div1Rect.bottom < div2Rect.top ||
      div1Rect.top > div2Rect.bottom
    );
  }

function moveRandomly(obj) {
    let randX, randY
    if(obj.getBoundingClientRect().left - 80 <= 0) {
        randX = Math.floor(Math.random() * 80);
        randY = Math.floor(Math.random() * (65 - (-65) + 1)) + (-65);
    } else if(obj.getBoundingClientRect().right + 80 >= window.innerWidth) {
        randX = Math.floor(Math.random() * -80);
        randY = Math.floor(Math.random() * (65 - (-65) + 1)) + (-65);
    } else if(obj.getBoundingClientRect().top - 65 <= 0) {
        randX = Math.floor(Math.random() * (80 - (-80) + 1)) + (-80);
        randY = Math.floor(Math.random() * 65);
    } else if(obj.getBoundingClientRect().bottom + 65 >= window.innerHeight) {
        randX = Math.floor(Math.random() * (80 - (-80) + 1)) + (-80);
        randY = Math.floor(Math.random() * -65);
    } else {
        randX = Math.floor(Math.random() * (80 - (-80) + 1)) + (-80);
        randY = Math.floor(Math.random() * (65 - (-65) + 1)) + (-65);
    }
    // console.log(randX, randY)
    
    let newX = obj.getBoundingClientRect().left + randX
    let newY = obj.getBoundingClientRect().top + randY
    obj.style.left = `${newX}px`
    obj.style.top = `${newY}px`

    // console.log(obj.getBoundingClientRect())
}


let rocks = []
function createRocks() {
    
    for(let i=0; i < 16; i++) {
        let rock = document.createElement('img')
        rock.src = "rock.png"
        rock.className = "rock"
        rock.id = "r"+i
        rocks.push(rock)
    }
    rocks.forEach(rock => document.querySelector('.rock-area').appendChild(rock))
}
createRocks()


let papers = []
function createPapers() {
    
    for(let i=0; i < 16; i++) {
        let paper = document.createElement('img')
        paper.src = "paper.png"
        paper.className = "paper"
        paper.id = "p"+i
        papers.push(paper)
    }
    papers.forEach(paper => document.querySelector('.paper-area').appendChild(paper))
}
createPapers()


let scissors = []
function createScissors() {
    
    for(let i=0; i < 16; i++) {
        let scissor = document.createElement('img')
        scissor.src = "scissors.png"
        scissor.className = "scissors"
        scissor.id = "s"+i
        scissors.push(scissor)
    }
    scissors.forEach(scissor => document.querySelector('.scissors-area').appendChild(scissor))
}
createScissors()


let newID = 100
setInterval(()=>{
    rocks.forEach(rock => moveRandomly(rock))
    papers.forEach(paper => moveRandomly(paper))
    scissors.forEach(scissor => moveRandomly(scissor))

    rocks.concat(papers).concat(scissors).forEach(alpha => {
        rocks.concat(papers).concat(scissors).forEach(beta => {
            if(alpha.id !== beta.id) {
                if(colliding(alpha, beta)) {
                    if(alpha.className === "rock" && beta.className === "scissors") {
                        console.log("rock won")
                        beta.className = "rock"
                        beta.src = "rock.png"
                        beta.id = 'r'+newID
                        newID += 1
                    } else if(alpha.className === "paper" && beta.className === "rock") {
                        console.log("paper won")
                        beta.className = "paper"
                        beta.src = "paper.png"
                        beta.id = 'p'+newID
                        newID += 1
                    } else if(alpha.className === "scissors" && beta.className === "paper") {
                        console.log("scissors won")
                        beta.className = "scissors"
                        beta.src = "scissors.png"
                        beta.id = 's'+newID
                        newID += 1
                    }
                }
            }
        })
    })
    
},300)


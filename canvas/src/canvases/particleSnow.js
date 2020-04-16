import Canv from '../CanvWriter.js'

const particleSnow = (c) => {
  let particles = []
  let tick = 0
  Canv.loop(() => {
    // 最大個数とparticle作成タイミング(frame)を指定
    createParticles(particles.length < 70 && tick % 40 === 0)
    updateParticles()
    killParticles()
    Canv.drawBG('black')
    drawParticles()
  })

  const createParticles = (condition) => {
    if (condition) particles.push(particle())
  }
  const particle = () => ({
    x: Math.random() * Canv.canvas.width,
    y: 0,
    speed: 2 + Math.random() * 3, //  2 ~ 5
    radius: 5 + Math.random() * 8,
    color: Canv.randomRGBA(0.3 + Math.random() * 0.5),
  })
  const updateParticles = () => {
    for (let part of particles) {
      part.y += part.speed
    }
    tick++
  }
  const killParticles = () => {
    for (let part of particles) {
      if (part.y > Canv.canvas.height) part.y = 0
    }
  }
  const drawParticles = () => {
    for (let part of particles) {
      Canv.drawArc(part.x, part.y, part.radius, part.color)
    }
  }
}

export default particleSnow

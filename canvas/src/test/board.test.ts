import Board, {
  DIRECTION,
  Square,
  Token,
  createSquare,
} from '../canvases/nekonote/board'

const canvas: HTMLCanvasElement = document.createElement('canvas')
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')
const b = new Board(canvas, ctx, 800)
let t: number = 0

describe('TEST TO BOARD', () => {
  afterEach(() => {
    b.resetBoardData()
  })
  test('initialize', () => {
    console.log(b.board)
    expect(b.board).toEqual([
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
  })
  test('putToken', () => {
    const s00 = createSquare(0, 0)
    expect(Board.putWhite(b.board)(s00)).toEqual([
      [1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
    expect(Board.putBlack(b.board)(s00)).toEqual([
      [0, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
  })
  test('reverseToken', () => {
    const s00 = createSquare(0, 0)
    const s33 = createSquare(3, 3)
    expect(Board.reverseToken(b.board)(s00)).toEqual([
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
    expect(Board.reverseToken(b.board)(s33)).toEqual([
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 0, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
    expect(Board.reverseToken(b.board)(s33)).toEqual([
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, 1, 0, -1, -1, -1],
      [-1, -1, -1, 0, 1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
    ])
  })
  test('scanLine', () => {
    const D1: DIRECTION = { x: 1, y: 0 }
    const D2: DIRECTION = { x: 0, y: 1 }
    const D3: DIRECTION = { x: 1, y: 1 }
    const D4: DIRECTION = { x: -1, y: 1 }
    const S1: Square = { row: 0, col: 0 }
    const S2: Square = { row: 3, col: 3 }
    const S3: Square = { row: 3, col: 4 }
    const S4: Square = { row: 3, col: 2 }
    const S5: Square = { row: 2, col: 3 }
    const S6: Square = { row: 4, col: 4 }
    const S7: Square = { row: 0, col: 7 }
    expect(Board.scanLinePattern(b.board)(D1)(S1)).toEqual({
      arr: [
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
        {
          row: 0,
          col: 5,
        },
        {
          row: 0,
          col: 6,
        },
        {
          row: 0,
          col: 7,
        },
      ],
      pattern: 'BBBBBBB',
    })
    expect(Board.scanLinePattern(b.board)(D1)(S2)).toEqual({
      arr: [
        {
          row: 3,
          col: 4,
        },
        {
          row: 3,
          col: 5,
        },
        {
          row: 3,
          col: 6,
        },
        {
          row: 3,
          col: 7,
        },
      ],
      pattern: '0BBB',
    })
    expect(Board.scanLinePattern(b.board)(D1)(S3).pattern).toEqual('BBB')
    expect(Board.scanLinePattern(b.board)(D1)(S4).pattern).toEqual('10BBB')
    expect(Board.scanLinePattern(b.board)(D1)(S5).pattern).toEqual('BBBB')
    expect(Board.scanLinePattern(b.board)(D1)(S6).pattern).toEqual('BBB')
    expect(Board.scanLinePattern(b.board)(D2)(S1).pattern).toEqual('BBBBBBB')
    expect(Board.scanLinePattern(b.board)(D2)(S2).pattern).toEqual('0BBB')
    expect(Board.scanLinePattern(b.board)(D2)(S6).pattern).toEqual('BBB')
    expect(Board.scanLinePattern(b.board)(D3)(S1).pattern).toEqual('BB11BBB')
    expect(Board.scanLinePattern(b.board)(D4)(S7).pattern).toEqual('BB00BBB')
  })
  test('enablePutSquares', () => {
    expect(Board.canPutSquares(b.board)(Token.WHITE)).toEqual([
      { col: 4, row: 2 },
      { col: 5, row: 3 },
      { col: 2, row: 4 },
      { col: 3, row: 5 },
    ])
    expect(Board.canPutSquares(b.board)(Token.BLACK)).toEqual([
      { col: 3, row: 2 },
      { col: 2, row: 3 },
      { col: 5, row: 4 },
      { col: 4, row: 5 },
    ])
  })
  test('execReverse', () => {
    expect(
      Board.reverseSquares(b.board)({ row: 2, col: 4 }, Token.WHITE)
    ).toEqual([
      {
        row: 3,
        col: 4,
      },
    ])
    expect(
      Board.reverseSquares(b.board)({ row: 4, col: 5 }, Token.BLACK)
    ).toEqual([
      {
        row: 4,
        col: 4,
      },
    ])
  })
})

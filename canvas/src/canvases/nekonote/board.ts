import Resources from './resources'
//
const funcTimes = (func: Function) => (n: number) => () => {
    for (let i = 0; i < n; i++) func()
}
//
export enum Token {
    WHITE = 1,
    BLACK = 0,
    BLANK = -1
}
export type Square = {
    row: number,
    col: number
}
type SquareFunc = (square: Square) => void
export type DIRECTION = {
    x: 1 | -1 | 0,
    y: 1 | -1 | 0
}
const DIRECTIONS: DIRECTION[] = [
    { x: 0, y: 1 }, { x: 0, y: -1 },
    { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: -1 },
    { x: -1, y: 0 }, { x: -1, y: 1 }, { x: -1, y: -1 }
]
type State = {
    canPutSquares: Square[],
    reverseSquares: Square[],
    player: Token.WHITE | Token.BLACK,
    oldPlayer: Token.WHITE | Token.BLACK,
}
type BoardState = number[][]
type imgItem = {
    name: string, url: string 
}
type scanedLineData = {
    pattern: string,
    arr: Square[]
}
const getEnemy = (player: Token) => player === Token.WHITE ? Token.BLACK : Token.WHITE
export const createSquare = (r: number, c: number): Square => ({ row: r, col: c })

class Board {
    static readonly ROW = 8
    static readonly COLUMN = 8
    // Square, Token
    static getToken = (board: BoardState, s: Square): Token => board[s.row][s.col]
    static putToken = (board: BoardState) => (s: Square) => (token: Token): BoardState => {
        board[s.row][s.col] = token
        return board
    }
    static putWhite = (board: BoardState) => (s: Square): BoardState => Board.putToken(board)(s)(Token.WHITE)
    static putBlack = (board: BoardState) => (s: Square): BoardState => Board.putToken(board)(s)(Token.BLACK)
    static reverseToken = (board: BoardState) => (s: Square): BoardState => {
        let square = Board.getToken(board, s)
        if (square === Token.BLACK) Board.putWhite(board)(s)
        if (square === Token.WHITE) Board.putBlack(board)(s)
        return board
    }
    static walk = (func: SquareFunc) => {
        for (let row = 0; row < Board.ROW; row++) {
            for (let col = 0; col < Board.COLUMN; col++) {
                func({ row, col })
            }
        }
    }
    static generateNewBoardData = (): BoardState => {
        let board: BoardState = []
        const row: number[] = new Array(Board.COLUMN).fill(Token.BLANK)
        const pushRow = () => board.push(row.slice(0))
        funcTimes(pushRow)(Board.ROW)()
        Board.putWhite(board)({ row: 3, col: 3 })
        Board.putWhite(board)({ row: 4, col: 4 })
        Board.putBlack(board)({ row: 3, col: 4 })
        Board.putBlack(board)({ row: 4, col: 3 })
        return board
    }
    static notPutToken = (board: BoardState) => (s: Square) => board[s.row] === undefined || Board.getToken(board, s) === undefined
    static convertTokenToStrings = (t: Token) => t === Token.BLANK ? 'B' : t
    // Check board status
    static scanLinePattern = (board: BoardState) => (d: DIRECTION) => (center: Square): scanedLineData => {
        let scanedData: scanedLineData = { pattern: '', arr: [] }
        for (let n = 1; ; n++) {
            const currentSquare: Square = {
                row: center.row + d.y * n,
                col: center.col + d.x * n
            }
            if (Board.notPutToken(board)(currentSquare)) break
            scanedData.pattern += Board.convertTokenToStrings(Board.getToken(board, currentSquare))
            scanedData.arr.push(currentSquare)
        }
        return scanedData
    }
    static searchCanPutSquares = (board: BoardState) => (player: Token, s: Square): boolean => {
        const enemy = getEnemy(player)
        if (board[s.row][s.col] !== Token.BLANK) return false //  Blankでないマスは配置不可
        for (let i in DIRECTIONS) {
            const line: scanedLineData = Board.scanLinePattern(board)(DIRECTIONS[i])(s)
            const regExStr = new RegExp('^' + enemy + '+' + player)
            if (line.pattern.match(regExStr)) return true
        }
    }
    static canPutSquares = (board: BoardState) => (player: Token): Square[] => {
        const enableSquares: Square[] = []
        Board.walk((s: Square) => {
            if (Board.searchCanPutSquares(board)(player, s)) enableSquares.push(s)
        })
        return enableSquares
    }
    static canPut = (target: Square, squares: Square[]): boolean => {
        for (let i in squares) {
            if (target.row === squares[i].row && target.col === squares[i].col) return true
        }
        return false
    }
    // Draw
    static drawLine = (ctx: CanvasRenderingContext2D, row: number, col: number, squareSize: number): void => {
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < col; j++) {
                ctx.strokeRect(squareSize * i, squareSize * j, squareSize, squareSize)
            }
        }
        return
    }
    static drawToken = (
        ctx: CanvasRenderingContext2D,
        board: BoardState,
        imgs: {
            white: HTMLImageElement,
            black: HTMLImageElement
        },
        squareSize: number,
        target: Square
    ) => {
        const image = Board.getImage(board, target, imgs)
        if (image) ctx.drawImage(image, squareSize * target.col, squareSize * target.row, squareSize, squareSize)
    }
    static getImage = (board: BoardState, target: Square, imgs: { white: HTMLImageElement, black: HTMLImageElement }) => {
        if (Board.getToken(board, target) === Token.WHITE) return imgs.white
        if (Board.getToken(board, target) === Token.BLACK) return imgs.black
    }
    // TODO: Imageとする必要はないかもしれない
    static createVoidImage = (size: number, color: string, offset = 0) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const voidImage = new Image()
        canvas.width = canvas.height = size
        ctx.fillStyle = color
        ctx.fillRect(offset, offset, size - (offset * 2), size - (offset * 2))
        voidImage.src = canvas.toDataURL()
        return voidImage
    }
    // Game
    static changePlayer = (state: State) => {
        state.oldPlayer = state.player
        state.player = getEnemy(state.oldPlayer)
    }
    // about String.match method:
    //   https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match
    static reverseSquares = (board: BoardState) => (s: Square, player: Token): Square[] => {
        let reverseSquares: Square[] = []
        const enemy = getEnemy(player)
        const canPutPattern = new RegExp('^(' + enemy + '+)' + player)
        for (let i in DIRECTIONS) {
            const scanedLine = Board.scanLinePattern(board)(DIRECTIONS[i])(s) //  列におけるTokenの並びを取得
            const found = scanedLine.pattern.match(canPutPattern)
            if (found === null) continue
            //
            const enemyLength = found[1].length
            for (let j = 0; j < enemyLength; j++) {
                const currentS: Square = scanedLine.arr[j]
                reverseSquares.push(currentS)
            }
        }
        // 裏返った位置を返す
        return reverseSquares
    }
    //
    //
    public board: BoardState = []
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private canvasSize: number
    private squareSize: number
    private resources: Resources = new Resources()
    private whiteImage: HTMLImageElement
    private greenImage: HTMLImageElement
    public state: State = {
        canPutSquares: [],
        reverseSquares: [],
        player: Token.WHITE,
        oldPlayer: Token.BLACK,
    }
    //
    public constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, canvasSize: number, imgItems: imgItem[] | null = null) {
        this.canvas = canvas
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.squareSize = this.canvasSize / Board.COLUMN
        this.whiteImage = Board.createVoidImage(this.squareSize, 'white', 1)
        this.greenImage = Board.createVoidImage(this.squareSize, 'rgba(0, 255, 0, 0.16)', 1)
        this.initBoard(imgItems)
    }
    private initBoard = (imgItems: imgItem[] | null = null) => {
        this.resetBoardData()
        this.setCanPutSquares()
        this.state.canPutSquares.forEach((square: Square) => this.putSquareColor(square)(this.greenImage));
        (async () => { await this.drawBoard(imgItems) })()
    }
    public resetBoardData = () => this.board = Board.generateNewBoardData()
    private drawBoard = async (imgItems: imgItem[]) => {
        Board.drawLine(this.ctx, Board.COLUMN, Board.ROW, this.squareSize);
        this.ctx.fillStyle = 'darkgray'
        await this.loadImages(imgItems)
        Board.walk((s: Square) => this.drawTokenImage(s))
    }
    private drawTokenImage = (square: Square) => {
        Board.drawToken(this.ctx, this.board, { white: this.resources.getimg('white'), black: this.resources.getimg('black') }, this.squareSize, square)
    }
    public setCanPutSquares = () => this.state.canPutSquares = Board.canPutSquares(this.board)(this.state.player)
    public afterPut = () => {
        Board.changePlayer(this.state)
        this.setCanPutSquares()
        this.state.canPutSquares.forEach((square: Square) => this.putSquareColor(square)(this.greenImage))
    }
    private putSquareColor = (square: Square) => (image: HTMLImageElement) => {
        this.ctx.drawImage(image, this.squareSize * square.col, this.squareSize * square.row)
    }
    private putToken = (square: Square) => Board.putToken(this.board)(square)(this.state.player) 
    public updatePutSquare = (clickedSquare: Square) => {
        this.state.canPutSquares.forEach((square: Square) => this.putSquareColor(square)(this.whiteImage))
        this.putToken(clickedSquare)
        this.drawTokenImage(clickedSquare)
    }
    public updateReverseSquares = (clickedSquare: Square) => {
        const reverseSquares = Board.reverseSquares(this.board)(clickedSquare, this.state.player)
        reverseSquares.forEach((clickedSquare: Square) => {
            this.putToken(clickedSquare)
            this.ctx.drawImage(this.whiteImage, this.squareSize * clickedSquare.col, this.squareSize * clickedSquare.row)
            this.drawTokenImage(clickedSquare)
        })
    }
    public loadImages = async (imgItems: imgItem[]) => {
        await this.resources.loadImages(imgItems)
    }
    public getClickedSquare = (clicked: { x: number, y: number }): Square => {
        const O: DOMRect = this.canvas.getBoundingClientRect()
        const relaXYClicked = { x: clicked.x - O.x, y: clicked.y - O.y }
        return {
            row: Math.floor(relaXYClicked.y / this.squareSize),
            col: Math.floor(relaXYClicked.x / this.squareSize)
        }
    }
}

export default Board
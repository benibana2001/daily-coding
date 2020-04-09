import Canv from '../../CanvWriter'
import Board, { Square } from './board'
import pet from '../../assets/pets-24px.svg'
import star from '../../assets/stars-24px.svg'

const nekonote = () => {
    // Event handler
    const clickBoardHandler = (e: MouseEvent) => {
        const position = { x: e.pageX, y: e.pageY }
        const clickedSquare = board.getClickedSquare(position)
        if (Board.canPut(clickedSquare, board.state.canPutSquares)) {
            board.updatePutSquare(clickedSquare)
            board.updateReverseSquares(clickedSquare)
            board.afterPut()
        }
    }
    // Setting canvas
    const offset = 20
    const canW = Canv.canvas.width - offset
    const canH = Canv.canvas.height - offset
    const canSize = canW > canH ? canH : canW
    // Load Image
    const imgsets: { name: string, url: string }[] = [
        { name: 'white', url: pet },
        { name: 'black', url: star }
    ]
    // Create board
    const board = new Board(
        Canv.canvas,
        Canv.ctx,
        canSize,
        imgsets
    );
    //
    Canv.canvas.addEventListener('click', clickBoardHandler)
}

export default nekonote
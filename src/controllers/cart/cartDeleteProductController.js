import cartController from cartController.js //aquí hay que importar desde el archivo creado por Alex
import generateErrorsUtils from generateErrorsUtils.js
//falta importar el archivo service cuando lo suba 

const removeFromCart = async (req, res, next) => {
    const { userId, productId } = req.params;

    try {
        await cartDeleteProductService (userId, productId) 
        res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        next(error);
    }
}; 

export default removeFromCart; 

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `pruebatablero` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pruebatablero`;

CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text,
  `fecha_vencimiento` date DEFAULT NULL,
  `peso` int NOT NULL DEFAULT '5',
  `estado` varchar(20) NOT NULL DEFAULT 'Por hacer',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` (`id`, `titulo`, `descripcion`, `fecha_vencimiento`, `peso`, `estado`) VALUES
	(17, 'Pasear al perro', 'Llevar a pasear al perro al parque del centro', '2023-04-05', 2, 'En proceso'),
	(18, 'Pagar la renta', 'Realizar el pago de la renta mensual al casero', '2023-04-10', 7, 'Por hacer'),
	(19, 'Revisar el correo', 'Revisar el correo electrónico y responder a los correos importantes', '2023-04-15', 4, 'En proceso'),
	(20, 'Escribir informe', 'Escribir un informe sobre las ventas del mes para presentarlo a la gerencia', '2023-04-20', 8, 'Terminada'),
	(28, 'Poner la colada', 'Colgar ropa de la lavadora', '2023-03-27', 3, 'Por hacer'),
	(57, 'Hacer la compra', 'Comprar los alimentos para la semana en el supermercado', '2023-03-27', 3, 'En proceso'),
	(58, 'Limpiar la casa', 'Limpiar el polvo, barrer y fregar el suelo en todas las habitaciones', '2023-03-28', 5, 'Terminada'),
	(59, 'Hacer ejercicio', 'Ir al gimnasio y hacer 1 hora de ejercicio cardiovascular', '2023-03-28', 8, 'Terminada'),
	(60, 'Estudiar para el examen', 'Repasar los temas de la unidad 5 del libro de matemáticas', '2023-04-02', 9, 'Por hacer'),
	(61, 'Cocinar una cena especial', 'Preparar una cena romántica para mi pareja', '2023-03-29', 7, 'Por hacer'),
	(67, 'Graphic design its not my passion', 'Por favor que me ayude un diseñador de verdad :c', '2023-03-27', 3, 'Por hacer');
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

CREATE USER 'tablero'@'localhost' IDENTIFIED BY 'tablero';
GRANT ALL PRIVILEGES ON pruebatablero.* TO 'tablero'@'localhost';
FLUSH PRIVILEGES;
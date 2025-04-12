const readline = require('readline-sync');

let catalogo = [];

// 1. Agregar libro
function agregarLibro() {
    const titulo = readline.question("Título: ");
    const autor = readline.question("Autor: ");
    const precio = parseFloat(readline.question("Precio: "));
    const anio = parseInt(readline.question("Año de publicación: "));

    if (isNaN(precio) || precio <= 0 || isNaN(anio)) {
        console.log("Datos inválidos. Intenta de nuevo.");
        return;
    }

    const libro = { titulo, autor, precio, anio };
    catalogo.push(libro);
    console.log("Libro agregado correctamente.");
}

// 2. Mostrar catálogo
function mostrarCatalogo() {
    if (catalogo.length === 0) {
        console.log("Catálogo vacío.");
        return;
    }

    catalogo.forEach((libro, index) => {
        console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.anio}) - $${libro.precio}`);
    });
}

// 3. Buscar libro por título
function buscarPorTitulo() {
    const titulo = readline.question("Título a buscar: ");
    const libro = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

    if (libro) {
        console.log(`Título: ${libro.titulo}, Autor: ${libro.autor}, Año: ${libro.anio}, Precio: $${libro.precio}`);
    } else {
        console.log("Libro no encontrado.");
    }
}

// 4. Eliminar libro
function eliminarLibro() {
    const titulo = readline.question("Título del libro a eliminar: ");
    const index = catalogo.findIndex(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

    if (index !== -1) {
        catalogo.splice(index, 1);
        console.log("Libro eliminado con éxito.");
    } else {
        console.log("Libro no encontrado.");
    }
}

// 5. Ver estadísticas
function verEstadisticas() {
    if (catalogo.length === 0) {
        console.log("No hay libros para analizar.");
        return;
    }

    const total = catalogo.length;
    const precioPromedio = catalogo.reduce((acc, libro) => acc + libro.precio, 0) / total;
    const masAntiguo = catalogo.reduce((a, b) => a.anio < b.anio ? a : b);
    const masCaro = catalogo.reduce((a, b) => a.precio > b.precio ? a : b);

    console.log(`Total de libros: ${total}`);
    console.log(`Precio promedio: $${precioPromedio.toFixed(2)}`);
    console.log(`Libro más antiguo: ${masAntiguo.titulo} (${masAntiguo.anio})`);
    console.log(`Libro más caro: ${masCaro.titulo} - $${masCaro.precio}`);
}

// 6. Ordenar libros
function ordenarLibros() {
    console.log("1. Por precio ascendente");
    console.log("2. Por precio descendente");
    console.log("3. Por año de publicación");
    const opcion = readline.question("Elige una opción: ");

    let ordenado = [];

    switch (opcion) {
        case '1':
            ordenado = [...catalogo].sort((a, b) => a.precio - b.precio);
            break;
        case '2':
            ordenado = [...catalogo].sort((a, b) => b.precio - a.precio);
            break;
        case '3':
            ordenado = [...catalogo].sort((a, b) => a.anio - b.anio);
            break;
        default:
            console.log("Opción no válida.");
            return;
    }

    ordenado.forEach(libro => {
        console.log(`${libro.titulo} - ${libro.autor} (${libro.anio}) - $${libro.precio}`);
    });
}

// 7. Editar libro
function editarLibro() {
    const titulo = readline.question("Título del libro a editar: ");
    const libro = catalogo.find(libro => libro.titulo.toLowerCase() === titulo.toLowerCase());

    if (!libro) {
        console.log("Libro no encontrado.");
        return;
    }

    libro.titulo = readline.question(`Nuevo título (${libro.titulo}): `) || libro.titulo;
    libro.autor = readline.question(`Nuevo autor (${libro.autor}): `) || libro.autor;
    const nuevoPrecio = readline.question(`Nuevo precio (${libro.precio}): `);
    const nuevoAnio = readline.question(`Nuevo año (${libro.anio}): `);

    if (nuevoPrecio) libro.precio = parseFloat(nuevoPrecio);
    if (nuevoAnio) libro.anio = parseInt(nuevoAnio);

    console.log("Libro actualizado.");
}

// 8. Salir
function salir() {
    console.log("¡Hasta luego!");
    process.exit();
}

// Menú principal
function menu() {
    while (true) {
        console.log(`
===== MENÚ PRINCIPAL =====
1. Agregar libro
2. Mostrar catálogo
3. Buscar libro por título
4. Eliminar libro
5. Ver estadísticas
6. Ordenar libros
7. Editar libro
8. Salir
`);
        const opcion = readline.question("Selecciona una opción: ");
        switch (opcion) {
            case '1': agregarLibro(); break;
            case '2': mostrarCatalogo(); break;
            case '3': buscarPorTitulo(); break;
            case '4': eliminarLibro(); break;
            case '5': verEstadisticas(); break;
            case '6': ordenarLibros(); break;
            case '7': editarLibro(); break;
            case '8': salir(); break;
            default: console.log("Opción inválida."); break;
        }
    }
}

menu();

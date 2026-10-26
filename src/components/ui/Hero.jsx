
export default function Hero() {
    return (
        <div
            className="hero min-h-screen bg-black
            "
            style={{
                backgroundImage:
                    "url(https://www.noticiastaurinas.com/images/la-influencia-de-la-musica-en-tu-rendimiento-deportivo.jpg)",
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Bienvenido a </h1>
                    <h1 className="mb-5 text-5xl font-bold">Music App</h1>
                    <p className="mb-5">
                        Encuentra la mejor música para tus entrenamientos y disfruta de una experiencia única.
                    </p>
                    <button className="btn btn-primary">Comenzar</button>
                </div>
            </div>
        </div>
    )
}

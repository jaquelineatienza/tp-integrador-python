
const app_url = "http://127.0.0.1:8000"
export interface FeaturesRequest {
    features: number[];
}


export interface Dates {
    age: number,
    experience: number,
    income: number,
    zip_Code: number,
    family: number,
    cCAvg: number,
    education: number,
    mortgage: number
}

export const prediction = async (date: Dates) => {
    const features: FeaturesRequest["features"] = [
        date.age,
        date.experience,
        date.income,
        date.zip_Code,
        date.family,
        date.cCAvg,
        date.education,
        date.mortgage
    ];

    try {
        const response = await fetch(`${app_url}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ features }),
        });
        console.log(response)
        if (!response.ok) {
            console.error("Error en la respuesta del servidor", await response.text());
            throw new Error("Fallo en la predicción");
        }

        const resultado = await response.json();
        console.log(resultado)
        return resultado
    } catch (error) {
        console.error("Error haciendo la predicción:", error);
        throw error;
    }
};

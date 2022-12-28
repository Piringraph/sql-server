import { getConnection } from "./../databases/database";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, programmers FROM language");
        console.log(result);
        res.json (result);    
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const getLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT id, name, programmers FROM language WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const addLanguage = async (req, res) => {
    try {
        const { name, programmers }=req.body;

        if(name===undefined || programmers === undefined){
            res.status(400)({message: "Bad request, please fill all the fields."});
        }

        const language = { name,programmers };
        const connection = await getConnection();
        await connection.query("INSERT INTO language SET ?", language);
        res.json({message: "Language added sucessfully!"});
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, programmers }=req.body;
        
        if(id===undefined || name===undefined || programmers === undefined){
            res.status(400)({message: "Bad request, please fill all the fields."});
        }

        const language = { id, name, programmers };
        const connection = await getConnection();
        const result = await connection.query("UPDATE LANGUAGE SET ? WHERE id = ?", [language, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM language WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getLanguages,
    getLanguage,
    addLanguage,
    updateLanguage,
    deleteLanguage
};
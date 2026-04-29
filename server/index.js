const express = require('express');
const multer = require('multer');
const util = require('util');

// Polyfill per a util.isNullOrUndefined que ha estat eliminat en versions recents de Node.js
if (typeof util.isNullOrUndefined === 'undefined') {
    util.isNullOrUndefined = (val) => val === null || val === undefined;
}

const tf = require('@tensorflow/tfjs-node');
const mobilenet = require('@tensorflow-models/mobilenet');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configuració de multer per gestionar les pujades d'imatges
// Les imatges es guarden a la carpeta 'uploads'
const upload = multer({ dest: 'uploads/' });

let model;

// Funció per carregar el model de TensorFlow
async function loadModel() {
    console.log('Carregant model MobileNet...');
    model = await mobilenet.load();
    console.log('Model carregat correctament.');
}

// Diccionari de traduccions i categories per als resultats de MobileNet
const diccionariAliments = {
    // Fruites
    'apple': { ca: 'Poma', cat: 'fruita' },
    'granny smith': { ca: 'Poma', cat: 'fruita' },
    'banana': { ca: 'Plàtan', cat: 'fruita' },
    'orange': { ca: 'Taronja', cat: 'fruita' },
    'strawberry': { ca: 'Maduixa', cat: 'fruita' },
    'grape': { ca: 'Raïm', cat: 'fruita' },
    'pineapple': { ca: 'Pinya', cat: 'fruita' },
    'mango': { ca: 'Mango', cat: 'fruita' },
    'watermelon': { ca: 'Sindria', cat: 'fruita' },
    'peach': { ca: 'Pressec', cat: 'fruita' },
    'pear': { ca: 'Pera', cat: 'fruita' },
    'cherry': { ca: 'Cirera', cat: 'fruita' },
    'lemon': { ca: 'Llimona', cat: 'fruita' },
    'pomegranate': { ca: 'Magrana', cat: 'fruita' },
    'fig': { ca: 'Figa', cat: 'fruita' },
    'strawberry': { ca: 'Maduixa', cat: 'fruita' },
    
    // Verdures i hortalisses
    'broccoli': { ca: 'Bròquil', cat: 'verdura' },
    'carrot': { ca: 'Pastanaga', cat: 'verdura' },
    'cucumber': { ca: 'Cogombre', cat: 'verdura' },
    'tomato': { ca: 'Tomàquet', cat: 'verdura' },
    'potato': { ca: 'Patata', cat: 'verdura' },
    'onion': { ca: 'Ceba', cat: 'verdura' },
    'garlic': { ca: 'All', cat: 'verdura' },
    'bell pepper': { ca: 'Pebrot', cat: 'verdura' },
    'pepper': { ca: 'Pebrot', cat: 'verdura' },
    'spinach': { ca: 'Espinacs', cat: 'verdura' },
    'lettuce': { ca: 'Enciam', cat: 'verdura' },
    'cabbage': { ca: 'Col', cat: 'verdura' },
    'cauliflower': { ca: 'Coliflor', cat: 'verdura' },
    'zucchini': { ca: 'Carbassó', cat: 'verdura' },
    'eggplant': { ca: 'Albergínia', cat: 'verdura' },
    'artichoke': { ca: 'Carxofa', cat: 'verdura' },
    'mushroom': { ca: 'Bolet', cat: 'verdura' },
    'corn': { ca: 'Blat de moro', cat: 'verdura' }
};

// Funció millorada per determinar la traducció i la categoria
function processarResultat(label) {
    const l = label.toLowerCase();
    
    // Buscar si alguna de les nostres claus està inclosa en l'etiqueta de MobileNet
    for (const [clau, dades] of Object.entries(diccionariAliments)) {
        if (l.includes(clau)) {
            return {
                nom: dades.ca,
                categoria: dades.cat
            };
        }
    }
    
    // Si no es troba, retornem el nom original i categoria desconeguda
    return {
        nom: label,
        categoria: 'desconegut'
    };
}

// Endpoint per detectar fruites o verdures
app.post('/api/detectar', upload.single('imatge'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No s’ha pujat cap imatge.' });
        }

        // Llegir la imatge del sistema de fitxers
        const imageBuffer = fs.readFileSync(req.file.path);
        const image = tf.node.decodeImage(imageBuffer);

        // Classificar la imatge
        const predictions = await model.classify(image);
        
        // Netejar la imatge de la memòria de TensorFlow
        image.dispose();

        // Eliminar el fitxer temporal
        fs.unlinkSync(req.file.path);

        if (predictions.length > 0) {
            const topPrediction = predictions[0];
            const info = processarResultat(topPrediction.className);

            res.json({
                success: true,
                etiqueta: info.nom,
                categoria: info.categoria,
                probabilitat: (topPrediction.probability * 100).toFixed(2) + '%'
            });
        } else {
            res.json({ success: false, missatge: 'No s’ha pogut identificar res.' });
        }
    } catch (error) {
        console.error('Error en el processament:', error);
        res.status(500).json({ error: 'Error intern del servidor.' });
    }
});

// Iniciar el servidor després de carregar el model
loadModel().then(() => {
    app.listen(port, () => {
        console.log(`Servidor escoltant a http://localhost:${port}`);
    });
});

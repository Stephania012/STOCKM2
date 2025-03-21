import React, {useEffect, useState} from "react";
import axios from "axios";

const Formulaire = () => {

    const [data,setData] = useState({
        numProduit:'',
        designation:'',
        nomFournisseur:'',
        qteentree:''
    })
    const handeSubmit = () => {
        axios.post('http://localhost:5000', data).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div>
            <form onSubmit={handeSubmit}>
                <div>
                    <label>Numero du produit</label>
                    <input 
                    type="text" 
                    name="numProduit" 
                    id="numProduit" 
                    onChange={(e)=>{setData({...data, numProduit: e.target.value})}}/>
                </div>
                <div>
                    <label>Désignation</label>
                    <input type="text" 
                    name="design" 
                    id="design"
                    onChange={(e)=>{setData({...data, design: e.target.value})}} />
                </div>
                <div>
                    <label>Nom du fournisseur</label>
                    <input type="text" 
                    name="nomFournisseur" 
                    id="nomFournisseur"
                    onChange={(e)=>{setData({...data, nomFournisseur: e.target.value})}} />
                </div>
                <div>
                    <label>Quantite</label>
                    <input type="text" 
                    name="qteentree" 
                    id="qteentree"
                    onChange={(e)=>{setData({...data, qteentree: e.target.value})}} />
                </div>
            </form>
        </div>
    )
}
export default Formulaire
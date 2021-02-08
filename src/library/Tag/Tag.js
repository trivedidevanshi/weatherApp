import React from "react";
import './Tag.css'
function Tag(props) {
    let {id,name,removeCities}=props;
    return (
        <div className="Tag">
                {name}
                <button onClick={()=>removeCities(id)}>x</button>
        </div>
    );
}
export default Tag;

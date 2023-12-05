import React from "react";
import { useState } from "react";
import styles from "./Rating.module.css"

function Rating() {
const [rating,setRating] = useState(4.5);

const handleRatingChange = (newRating) => {
    setRating(newRating);
}


    return (
        <div>
            <div>
                {[1,2,3,4,5].map((star) => (
                    <span className={styles.rating} 
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        style={
                            {
                                cursor:'pointer',
                                color:star <= rating ? 'gold' : 'gray',
                            }
                        }>
                        
                            &#9733; 
                            
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Rating
import React, { useEffect, useState } from "react";

const BingoCard = ({ bingoEncoding, tileClicked }) => {

    /* 
    0 1 2 
    3 4 5
    6 7 8

    bingoEncoding: ["Free Spell Hate", "Color Pie Break", ... ]
    */
    const [tiles, setTiles] = useState([]);

    const parseBingoEncoding = (bingoEncoding) => {
        const tiles = [];
        for (let i = 0; i < 9; i++) {
            tiles.push(bingoEncoding[i]);
        }
        return tiles;
    }

    useEffect(() => {
        setTiles(parseBingoEncoding(bingoEncoding));
    }, [bingoEncoding]);

    return (
        <div className="grid grid-cols-3 gap-4">
            {tiles.map((tile, i) => (
                <div 
                    key={i} 
                    className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 transition duration-300 h-40 text-center"
                    onClick={() => {
                        tileClicked(i);
                    }}    
                >
                    {tile}
                </div>
            ))}
        </div>

    );
}

export default BingoCard;
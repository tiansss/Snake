function dynamicTriangles(){
    return (
        [
            //snake1, one cube
            {
                "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0.5,0,0.5], "specular": [0.3,0.3,0.3], "n":17}, 
                "vertices": [[0,1,1],[1,1,1],[1,0,1],[0,0,1],
                            [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                            [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                            [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                            [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                            [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
                "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                            [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                            [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                            [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
                "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
            },
        
            //snake2 one cube
            {
                "material": {"ambient": [0.1,0.1,0.1], "diffuse": [0,0.5,0.2], "specular": [0.3,0.3,0.3], "n":17}, 
                "vertices": [[0,1,1],[1,1,1],[1,0,1],[0,0,1],
                            [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                            [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                            [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                            [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                            [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
                "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                            [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                            [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                            [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
                "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
            },
        
            //food one cube
            {
                "material": {"ambient": [0.1,0.1,0.1], "diffuse": [1,1,0], "specular": [0.3,0.3,0.3], "n":17}, 
                "vertices": [[0, 1, 1],[1, 1, 1],[1,0,1],[0,0,1],
                                [1,1,1],[1,1,0],[1,0,0],[1,0,1],
                                [0,1,0],[1,1,0],[1,0,0],[0,0,0],
                                [0,1,1],[0,0,1],[0,0,0],[0,1,0],
                                [0,1,1],[0,1,0],[1,1,0],[1,1,1],
                                [0,0,1],[1,0,1],[1,0,0],[0,0,0]],
                "normals": [[0, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1],
                            [1,0,0],[1,0,0],[1,0,0],[1,0,0],
                            [0,0,-1],[0,0,-1],[0,0,-1],[0,0,-1],
                            [-1,0,0],[-1,0,0],[-1,0,0],[-1,0,0],
                            [0,1,0],[0,1,0],[0,1,0],[0,1,0],
                            [0,-1,0],[0,-1,0],[0,-1,0],[0,-1,0]],
                "triangles": [[0,1,2],[2,3,0],[4,5,6],[6,7,4],[8,9,10],[10,11,8],[12,13,14],[14,15,12],[16,17,18],[18,19,16],[20,21,22],[22,23,20]]
            }
        ]
    )
}
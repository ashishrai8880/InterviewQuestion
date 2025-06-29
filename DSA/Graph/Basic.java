
import java.util.* ;
class Main {
    
    static class Edge{
        int src ;
        int dest ;
        
        Edge(int s , int d){
            this.src = s ;
            this.dest = d ;
        }
    }
    
    public static void createGraph(ArrayList<Edge>  graph[]){
        
        for(int i= 0 ; i<graph.length ; i++){
            graph[i] = new ArrayList<Edge>() ;
        }
        
        graph[0].add(new Edge(0,2));
        
        graph[1].add(new Edge(1,2));
        graph[1].add(new Edge(1,3));
        
        graph[2].add(new Edge(2,0));
        graph[2].add(new Edge(2,1));
        graph[2].add(new Edge(2,3));
        
        graph[3].add(new Edge(3,1));
        graph[3].add(new Edge(3,2));
    }
    
    public static void printNeigbours(int index , ArrayList<Edge> graph[]){
        
        ArrayList<Edge> vertex = graph[index] ;
        System.out.print("Neigbours are : ");
        for(int i=0 ; i<vertex.size() ; i++){
            System.out.print(vertex.get(i).dest + " ");
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Try programiz.pro");
        
        int V = 4 ;
        ArrayList<Edge> graph[] = new ArrayList[V];
        createGraph(graph);
        printNeigbours(2,graph);
        
    }
}

 export default abstract class TrippyApiBaseService {
    abstract sendQuery(query: String): Promise<any>;
 }
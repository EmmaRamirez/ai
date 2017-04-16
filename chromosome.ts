class Chromosome {
  static chromosomeLength:number = 5;
  static rand:Function = Math.random;
  static crossRate:number = 0.7;
  static mutRate:number = 0.001;
  static score:number = 0.0;
  static total:number = 0;
  static ltable:string[] = ['0', '1', '2', '3', '4', '5', '6', '8', '9', '+', '-', '*', '/'];
  public chromo:any = [];
}

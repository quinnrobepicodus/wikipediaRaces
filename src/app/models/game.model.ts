

export class Game {

  constructor(
    public username: string = '',
    public score: number = null,
    public beginArticle: string = '',
    public endArticle: string = '',
    public beginId: number = null,
    public endId: number = null,
    public articleHistoryTitles: string[] = [],
    public articleHistoryIDs: string[] = [],

    ) {

  }
}

// export class Game {
//   public beginArticle: string = '';
//   public endArticle: string = '';
//   public beginId: number = null;
//   public endId: number = null;
//   public articleHistoryTitles: string[] = [];
//   public articleHistoryIDs: string[] = [];
//   public timestamp: string = '';
//
//   constructor() { }
// }

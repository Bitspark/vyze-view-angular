import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VyzeService} from 'ng-vyze';
import {Universe} from 'vyze';

@Component({
  templateUrl: './my-view.component.html',
  styleUrls: ['./my-view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MyViewComponent implements OnInit {

  @Input()
  /**
   * Universe name containing all models.
   */
  public universe?: string;

  @Input()
  /**
   * Access profile containing spaces.
   */
  public profile?: string;

  @Input()
  /**
   * Access token granting access to the access profile and private universe information.
   */
  public token?: string;

  public name = 'My View';

  public myUniverse?: Universe | null;

  constructor(private vyze: VyzeService) {
  }

  async ngOnInit(): Promise<void> {
    // Subscribe to universe
    this.vyze.universe.subscribe(async (universe: Universe | undefined) => {
      this.myUniverse = universe;
    });

    if (this.universe) {
      // Load universe
      await this.vyze.loadUniverse(this.universe, this.token);
    }

    // Load profile
    const tokens = await this.vyze.service.getAccessTokens(this.profile ?? 'default', this.universe, this.token);
    if (tokens) {
      await this.vyze.system.addAccessTokens(tokens);
    }

    await this.vyze.stream.connect();

    const spaceTokens = this.vyze.system.getAccessTokens(['main_read', 'model_extend']);
    for (const token of spaceTokens) {
      await this.vyze.stream.registerSpaceToken(token);
    }
  }

}

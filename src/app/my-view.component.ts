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
    this.vyze.service.setToken(this.token);

    if (this.universe) {
      // Load universe
      await this.vyze.loadUniverse(this.universe);
    }

    await this.vyze.stream.connect();

    // Load profile
    if (this.profile) {
      const layerProfile = await this.vyze.service.getLayerProfile(this.profile);
      if (layerProfile) {
        this.vyze.system.layerProfile = layerProfile;
        await this.vyze.stream.registerLayerProfile(layerProfile);
      }
    }

    // Subscribe to universe
    this.vyze.universe.subscribe(async u => {
      this.myUniverse = u;
    });
  }

}

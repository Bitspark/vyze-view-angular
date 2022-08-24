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
   * Layer profile containing spaces.
   */
  public profile?: string;

  @Input()
  /**
   * Service token granting access to VYZE services such as universe modelling or layer profile token generation.
   */
  public token?: string;

  public name = 'My View';

  constructor(public vyze: VyzeService) {
  }

  async ngOnInit(): Promise<void> {
    this.vyze.service.setToken(this.token);

    if (this.universe) {
      // Load universe
      await this.vyze.loadUniverse(this.universe);
    }

    // Load profile
    if (this.profile) {
      const layerProfile = await this.vyze.service.getLayerProfile(this.profile);
      if (layerProfile) {
        this.vyze.system.layerProfile = layerProfile;
      }
    }
  }

}

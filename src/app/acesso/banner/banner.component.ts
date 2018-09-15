import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.css'],
    animations: [
        trigger('banner', [
            state(
                'hide',
                style({
                    'opacity': 0
                })
            ),
            state(
                'show',
                style({
                    'opacity': 1
                })
            ),
            transition('hide => show', animate('2s ease-in')),
            transition('show => hide', animate('2s ease-in'))
        ])
    ]
})

export class BannerComponent implements OnInit {
    public imagens: Imagem[] = [
        { estado: 'show', url: '/assets/banner-acesso/img_1.png' },
        { estado: 'hide', url: '/assets/banner-acesso/img_2.png' },
        { estado: 'hide', url: '/assets/banner-acesso/img_3.png' },
        { estado: 'hide', url: '/assets/banner-acesso/img_4.png' },
        { estado: 'hide', url: '/assets/banner-acesso/img_5.png' }
    ];

    constructor() {}

    ngOnInit() {
        setTimeout(() => this.rotacao(), 3000);
    }

    public rotacao(): void {
        let posicao = 0;

        for (let i = 0; i < this.imagens.length; i++) {
            if (this.imagens[i].estado === 'show') {
                this.imagens[i].estado = 'hide';

                posicao = i === 4 ? 0 : i + 1;

                this.imagens[posicao].estado = 'show';
                break;
            }
        }

        setTimeout(() => this.rotacao(), 3000);
    }
}

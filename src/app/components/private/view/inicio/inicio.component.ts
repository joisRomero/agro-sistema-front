import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import { lastValueFrom } from 'rxjs';
import { ReporteInicioRequest } from 'src/app/models/requests/reporteInicioRequest';
import { ReporteInicioResponse } from 'src/app/models/responses/reporteInicioResponse';
import { Usuario } from 'src/app/models/usuario';
import { ReportesService } from 'src/app/services/reportes.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  seriesNumber: ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2!: Partial<ChartOptions>;
  public idUsuario: string = (JSON.parse(localStorage.getItem("usuario")!) as Usuario).idUsuario;
  public data!: ReporteInicioResponse;

  constructor(
    private reporteService: ReportesService
  ) {
  }

  ngOnInit(): void {
    //this.iniciarControls();
  }

  public async iniciarControls() {

    let response = await this.service.obtenerInicio();

    this.data = response.body!

    let nombresCultivosBarra: string[] = [];
    this.data.gastosCultivos.forEach(item => {
      nombresCultivosBarra.push(item.cultivo)
    })

    let numerosCultivosBarra: number[] = [];
    this.data.gastosCultivos.forEach(item => {
      numerosCultivosBarra.push(item.gasto)
    })
    this.chartOptions = {
      series: [
        {
          name: "Gasto",
          data: numerosCultivosBarra
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: ""
      },
      xaxis: {
        categories: nombresCultivosBarra
      }
    };

    let nombresCultivosRedondela: string[] = [];
    this.data.cultivosCampania.forEach(item => {
      nombresCultivosRedondela.push(item.cultivo)
    })

    let numerosCultivosRedondela: number[] = [];
    this.data.cultivosCampania.forEach(item => {
      numerosCultivosRedondela.push(item.cantidad)
    })

    this.chartOptions2 = {
      seriesNumber: numerosCultivosRedondela,
      chart: {
        type: "donut"
      },
      labels: nombresCultivosRedondela,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      
    };
  }


  private service = {
    obtenerInicio: () => {
      let params : ReporteInicioRequest = {
        idUsuario: parseInt(this.idUsuario)
      }
      return lastValueFrom(this.reporteService.reporteInicio(params));
    }
  }

}

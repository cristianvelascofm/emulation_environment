<template>
  <div id="caca" class="pt-1 pb-1">
    <!-- Menú de Opciones -->
    <b-container id="menu-bar-emulator" class="col-12">
      <b-dropdown id="Archivo" list text="Archivo" variant="light">
        <b-dropdown-item id="nuevo" class="p-1">Nuevo</b-dropdown-item>
        <b-dropdown-item id="abrir" class="p-1">Abrir</b-dropdown-item>
        <b-dropdown
          dropright
          list
          id="plantilla"
          text="Abrir plantilla"
          class="w-100 pl-4"
          variant="light"
        >
          <b-dropdown-item class="p-1" @click="openModal('minimal')"
            >Minimal</b-dropdown-item
          >
          <b-dropdown-item class="p-1" @click="openModal('single')"
            >Single</b-dropdown-item
          >
          <b-dropdown-item class="p-1">Anillo</b-dropdown-item>
          <b-dropdown-item class="p-1">Lineal</b-dropdown-item>
        </b-dropdown>
        <b-dropdown-item id="guardar" class="p-1">Guardar</b-dropdown-item>
        <b-dropdown-item id="salir" class="p-1">Salir</b-dropdown-item>
      </b-dropdown>
      <b-dropdown
        id="dropdown-1"
        list
        text="Edición"
        class="m-md-2"
        variant="light"
      >
        <b-dropdown-item href="#" id="deshacer" class="p-1"
          >Deshacer</b-dropdown-item
        >
        <b-dropdown-item href="#" id="rehacer" class="p-1"
          >Rehacer</b-dropdown-item
        >
        <b-dropdown-item href="#" id="copiar" class="p-1"
          >Copiar</b-dropdown-item
        >
        <b-dropdown-item href="#" id="pegar" class="p-1">Pegar</b-dropdown-item>
        <b-dropdown-item href="#" id="seleccion" class="p-1"
          >Seleccionar Todo</b-dropdown-item
        >
        <b-dropdown-item href="#" id="borrar" class="p-1"
          >Borrar Todo</b-dropdown-item
        >
      </b-dropdown>
      <b-dropdown
        id="dropdown-1"
        list
        text="Emulación"
        class="m-md-2"
        variant="light"
      >
        <b-dropdown-item href="#" id="iniciarE" class="p-1"
          >Inicar Emulación</b-dropdown-item
        >
        <b-dropdown-item href="#" id="detenerE" class="p-1"
          >Detener Emulación</b-dropdown-item
        >
        <b-dropdown-item href="#" id="wireshark" class="p-1"
          >WireShark</b-dropdown-item
        >
        <b-dropdown-item href="#" id="genTraffic" class="p-1">Generador de Tráfico</b-dropdown-item
        >
        <b-dropdown-item href="#" id="graf" class="p-1"
          >Generador de Gráficas</b-dropdown-item
        >
        <b-dropdown-item href="#" id="odl" class="p-1"
          >Controlador OpenDayLigth</b-dropdown-item
        >
      </b-dropdown>
      <b-dropdown
        id="dropdown-1"
        list
        text="Ayuda"
        class="m-md-2"
        variant="light"
      >
        <b-dropdown-item href="#" id="doc" class="p-1"
          >Documentación</b-dropdown-item
        >
        <b-dropdown-item href="#" id="guie" class="p-1"
          >Guías de Usuario</b-dropdown-item
        >
        <b-dropdown-item href="#" id="about" class="p-1"
          >Acerca de...</b-dropdown-item
        >
      </b-dropdown>
    </b-container>
    <!-- Barra de Accesos directos del Menú de Opciones -->
    <b-container id="direct-access-bar" class="pl-4 text center col-12">
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="nuevo-direct-access"
        title="Nuevo"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="guardar-direct-access"
        title="Guardar"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="copiar-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="pegar-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="undo-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="redo-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="play-direct-access"
        @click="openModal('play')"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="stop-direct-access"
        @click="stopEmulation"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="check-direct-access"
        @click="openModal('traffic')"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="graf-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="diagram-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="odl-direct-access"
      ></button>
    </b-container>
    <!-- Barra Lateral y Canvas -->
    <b-row class="p-0 m-0 w-100">
      <!-- Barra Lateral Elementos de Red -->
      <b-col class="col-1 p-0 m-0" id="bar-lat">
        <b-nav vertical>
          <button
            id="btn-element"
            class="btn btn-outline-primary ml-3 mt-3 mr-3"
            variant="light"
            v-for="list of directaccess"
            v-bind:key="list.id"
            :name="list.id"
            @click="obtenerTool(list.id)"
          >
            <img
              :src="require('@/assets/img/' + list.src)"
              :width="list.imgsize + 'px'"
              :height="list.imgsize"
            />
          </button>
        </b-nav>
      </b-col>
      <!-- Canvas -->
      <b-col class="col-11 p-0 m-0">
        <b-container class="col-12 p-0" id="container-canvas">
          <canvas id="fcanvas" height="5000" width="5000" ref="canvas"></canvas>
        </b-container>
      </b-col>
    </b-row>

    <!-- Modal Done -->
    <b-modal id="modal-done" hide-footer centered title="RESULTADO">
      <b-container id="containerDone" class="">
        <b-container id="containerFormDone">
          <b-form id="formularioFancyDone" class="p-0">
            <b-row id="containerDone" class="m-0 pt-3">
              <b-col>
                <small class="p-0 m-0 text-center text-primary"  id="text-done">{{alertText}}</smnall>
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormDone" class="m-0 p-0 text-right">
          <b-col class="p-0"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="buttonModal"
              value="Guardar"
              class="m-2"
              @click="closeModal('done')"
              >Ok</b-button
            >
            </b-col
          >
        </b-row>
      </b-container>
    </b-modal>
    

    <!-- Modal Host -->
    <b-modal id="modal-host" hide-footer centered title="Host">
      <b-container id="containerInsertHost" class="">
        <b-container id="containerParameterFancyHost" class="ml-3">
          <img
            type="image"
            id="inputInfoHost"
            title="Información"
            src="@/assets/img/host.png"
            width="25px"
            height="30px"
            class="m-0 d-inline"
          />

          <label
            id="labelFancyHost d-inline text-center"
            class="ml-2 font-weight-bold text-uppercase"
            >{{ tagElement }}
          </label>
        </b-container>

        <b-container id="containerFormHost">
          <b-form id="formularioFancyHost" class="p-0">
            <b-row id="containerIPHost" class="m-0 pt-3">
              <b-col
                ><label id="labelFancyIPHost" class="p-0"
                  >Ruta por Defecto:</label
                ></b-col
              >
              <b-col>
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyIPHost"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerShedulerHost" class="m-0 pt-3">
              <b-col
                ><label id="labelSchedulerFancyHost" class="p-0 m-0">
                  Scheduler:
                </label></b-col
              >
              <b-col>
                <b-select
                  id="optionShedulerFancyHost"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno" selected="selected">Ninguno</option>
                  <option value="CFS">CFS</option>
                  <option value="RT">RT</option>
                </b-select>
                <i id="arrowProtocolFancyHost"></i
              ></b-col>
            </b-row>

            <b-row id="containerCPULimitHost" class="m-0 pt-3">
              <b-col
                ><label id="labelFancyCpuLimitHost" class="p-0">
                  Limite CPU :
                </label></b-col
              >
              <b-col
                ><b-input
                  type="number"
                  id="inputFancyCpuLimitHost"
                  step="0.01"
                  min="0"
                  max="1"
                  class="p-2 ml-4"
              /></b-col>
            </b-row>
            <b-row id="containerCPUCoresHost" class="m-0 pt-3">
              <b-col
                ><label id="labelFancyCPUCoreHost" class="p-0">
                  Núcleos CPU :
                </label></b-col
              >
              <b-col
                ><b-input
                  type="number"
                  id="inputFancyCPUCoresHost"
                  step="1"
                  min="0"
                  class="p-2 ml-4"
              /></b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormHost" class="m-0 p-0 text-right">
          <b-col class="p-0"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="buttonModal"
              value="Guardar"
              class="m-2"
              @click="element"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="buttonModal"
              class="m-2"
              value="Cancelar"
              @click="closeModal"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Detector IP Usuario -->
    <b-modal id="modal-IpUser" hide-footer centered title="Configurción IP">
      <b-container id="containerIpUser" class="">
        <b-container id="containerForm_IP_xclient">
          <b-form id="formulario_IP_xclient" class="p-0">
            <b-row id="containerIp" class="m-0 pt-3">
              <b-col class="col-3">
                <label id="labelIP" class="p-0">IP Local:</label>
              </b-col>

              <b-col class="col-9">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputIP_xclient"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerBtnSave" class="mt-2 p-0 text-right">
              <b-col class="p-0">
                <b-button
                  variant="dark"
                  squared
                  type="button"
                  id="buttonModal"
                  class="m-2"
                  @click="starEmulation"
                  >Ok</b-button
                >

                <b-button
                  squared
                  variant="dark"
                  id="buttonModal"
                  class="m-2"
                  value="Cancelar"
                  @click="closeModal('play')"
                  >Cancelar</b-button
                >
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </b-container>
      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Template Topology -->
    <b-modal
      id="modal-template"
      hide-footer
      centered
      title="Parámetros de la Red"
    >
      <b-container class="divFormTemplate">
        <b-form id="formulario">
          <b-row>
            <b-col><label id="labelHost">Número de Host:</label></b-col>
            <b-col
              ><b-input
                type="number"
                min="2"
                id="inputHostTemplate"
                name="fname"
            /></b-col>
          </b-row>
          <b-row
            id="containerFancyButtonFormTemplate"
            class="m-0 p-0 text-right"
          >
            <b-col class="p-0 mt-2"
              ><b-button
                variant="dark"
                squared
                type="button"
                id="buttonModal"
                value="Guardar"
                class="m-2"
                @click="createTopology"
                >Ok</b-button
              >
              <b-button
                squared
                variant="dark"
                id="buttonModal"
                class="m-2"
                value="Cancelar"
                @click="closeModal('single')"
                >Cancelar</b-button
              ></b-col
            >
          </b-row>
        </b-form>
      </b-container>
    </b-modal>

    <!-- Modal Generador de Tráfico -->
    <b-modal
      id="modal-traffic"
      cancel-title="Cancelar"
      scrollable
      centered
      title="Genetador de Tráfico"
      size="lg"
    >
      <b-container id="containerForm_traffic">
        <b-form id="formulario_traffic" class="p-0">
          <b-row id="containerSelectorraffic" class="m-0 pt-2">
            <b-col class="m-0 pt-0 col-6">
              <label id="labelSelectorTraffic" class="p-0 m-0">
                Seleccione el tipo de Tráfico:
              </label>
            </b-col>

            <b-col class="mt-0 mr-0 pt-0 col-6">
              <b-select
                id="optionSelectorTraffic"
                class="ml-4 text-right"
                data-default="Ninguno"
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
              </b-select>
            </b-col>
          </b-row>
          <!-- Label -->
          <b-row>
            <b-col
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
                >Establezca los parametros de tráfico
              </label>
            </b-col>
          </b-row>

          <!-- FILA PARAMETRO DE TIEMPO -->
          <b-row id="parameterTime" class="m-0 pt-1">
            <b-col class="p-1 m-0">
              <b-form-radio name="option-radios" value="time" id="radioTime">
                Tiempo de Emulación:
              </b-form-radio>
            </b-col>

            <b-col class="p-0 ml-5"
              ><b-input
                type="number"
                id="inputTime"
                step="0.1"
                min="1"
                max="100000"
                class="p-2 ml-2"
            /></b-col>
          </b-row>

          <!-- Fila Longitud de Paquete -->
          <b-row id="parameterLong" class="m-0 pt-2">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-checkbox
                id="checkboxLong"
                name="checkbox-Long"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Longitud del Paquete
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3"
              ><b-input
                type="number"
                id="inputLong"
                step="0.1"
                min="1"
                max="100000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <b-form-radio
                  name="option-radios-long"
                  value="long"
                  class="col-2 p-2 ml-4 pl-3"
                  id="radio-kbytes-long"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-long"
                  value="long"
                  class="col-2 p-2 ml-5 mt-0"
                  id="radio-mbytes-long"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Intervalo de Tiempo -->
          <b-row id="parameterRange" class="m-0 pt-2">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-checkbox
                id="checkboxRange"
                name="checkbox-Range"
                value="accepted"
                unchecked-value="not_accepted"
                >Intervalo de Tiempo</b-form-checkbox
              >
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3">
              <b-input
                type="number"
                id="inputRange"
                step="0.01"
                min="1"
                max="1000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <label
                  id="labelFancyHost d-inline text-center"
                  class="ml-4 mt-2"
                >
                  Segundos
                </label>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Bit Rate -->
          <b-row id="parameterRate" class="m-0 pt-2">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-checkbox
                id="checkboxRate"
                name="checkbox-Rate"
                value="accepted"
                unchecked-value="not_accepted"
                >Ancho de Banda del Destino
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3"
              ><b-input
                type="number"
                id="inputRate"
                step="0.01"
                min="1"
                max="1000000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <b-form-radio
                  name="option-radios-rate"
                  value="rateKb"
                  class="col-2 p-2 ml-4 pl-3"
                  id="radioKBitRate"
                >
                  Kb/s
                </b-form-radio>
                <b-form-radio
                  name="option-radios-rate"
                  value="rateMb"
                  class="col-2 p-2 ml-5 mt-0"
                  id="radioMBitRae"
                >
                  Mb/s
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Window -->
          <b-row id="parameterW" class="m-0 pt-2">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-checkbox
                id="checkboxW"
                name="checkbox-W"
                value="accepted"
                unchecked-value="not_accepted"
                >Tamaño de la Ventana Deslizante
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3"
              ><b-input
                type="number"
                id="inputW"
                step="0.01"
                min="1"
                max="1000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <b-form-radio
                  name="option-radios-w"
                  value="wkB"
                  class="col-2 p-2 ml-4 pl-3"
                  id="radioKBytesW"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-w"
                  value="wMb"
                  class="col-2 p-2 ml-5 mt-0"
                  id="radioMBytesW"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- FILA CANTIDAD DE PAQUETES -->
          <b-row id="parameterPacket" class="m-0 pt-1">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-radio
                name="option-radios"
                value="packet"
                id="radioPacket"
              >
                Cantidad de Paquetes
              </b-form-radio>
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3"
              ><b-input
                type="number"
                id="inputPacket"
                step="0.001"
                min="1"
                max="1000000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <b-form-radio
                  name="option-radios-packet"
                  value="wkB"
                  class="col-2 p-2 ml-4 pl-3"
                  id="radioKBytesPacket"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-packet"
                  value="wMb"
                  class="col-2 p-2 ml-5 mt-0"
                  id="radioMBytesPacket"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- FILA CANTIDAD DE PAQUETES -->
          <b-row id="parameterBlock" class="m-0 pt-1">
            <b-col class="p-1 m-0 mr-5 col-5">
              <b-form-radio name="option-radios" value="packet" id="radioBlock">
                Número de Bloques
              </b-form-radio>
            </b-col>

            <b-col class="p-0 m-0 col-3 ml-4 pl-3"
              ><b-input
                type="number"
                id="inputBlock"
                step="0.001"
                min="1"
                max="1000000"
                class="p-2 ml-2 mr-3 d-inline"
              />
            </b-col>

            <b-col class="col-2">
              <b-row>
                <b-form-radio
                  name="option-radios-Block"
                  value="wkB"
                  class="col-2 p-2 ml-4 pl-3"
                  id="radioKBytesBlock"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-Block"
                  value="wMb"
                  class="col-2 p-2 ml-5 mt-0"
                  id="radioMBytesBlock"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <b-row>
            <b-col
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
              >
                Seleccione el modo de operación
              </label>
            </b-col>
          </b-row>

          <b-row>
            <b-col class="col-4">
              <b-form-radio
                name="option-radios-type"
                value="global"
                id="radioGlobal"
              >
                Global
              </b-form-radio>
            </b-col>

            <b-col class="col-4">
              <b-form-radio
                name="option-radios-type"
                value="xtreme"
                id="radioXtreme"
              >
                Especifico
              </b-form-radio>
            </b-col>
            <b-col class="col-4">
              <b-form-radio
                name="option-radios-type"
                value="specific"
                id="radioSpecific"
              >
                Extremo a extremo
              </b-form-radio>
            </b-col>
          </b-row>

          <b-row class="m-3">
            <b-col class="col-4">
              <label id="parameterHostA"> Desde el Host: h </label>
            </b-col>

            <b-col class="col-2">
              <b-input
                type="number"
                id="inputHostA"
                step="1"
                min="1"
                max="10000"
                class="ml-0"
              />
            </b-col>
            <b-col class="col-4">
              <label id="parameterHostB"> al Host: h </label>
            </b-col>

            <b-col class="col-2">
              <b-input
                type="number"
                id="inputHostB"
                step="1"
                min="1"
                max="10000"
                class="ml-0"
              />
            </b-col>
          </b-row>
        </b-form>
      </b-container>

      <!-- BTN GUARDAR GENERAR Y CANCELAR -->
      <template #modal-footer>
        <b-row id="containerBtnSave" class="p-0 text-right">
          <b-col class="p-0">
            <b-button
              variant="dark"
              squared
              type="buttonModal"
              id="btnSaveIp"
              class="m-2 ml-5"
              @click="trafficGenerator"
              >Generar</b-button
            >

            <b-button
              squared
              variant="dark"
              id="buttonModal"
              class="m-2 mr-4"
              value="Cancelar"
              @click="closeModal('traffic')"
              >Cancelar</b-button
            >
          </b-col>
        </b-row>
      </template>
    </b-modal>


  </div>
</template>
  

<script>
import axios from "axios";
export default {
  data() {
    // Importamos JQuery
    const $ = require("jquery");
    // Lo declaramos globalmente
    window.$ = $;
    return {
      //Variable id Herramienta seleccionada (barra lateral)
      herramienta: "cursor",
      
      //Canvas
      canvas: "",

      //Varibales posición Fabric
      x0: "",
      y0: "",
      //Variables Insertar elemento
      imgElement: "",
      tagElement: "",

      //Variables para la Logica de los elementos en la Red simulada
      tagHost: [],
      tagSwitch: [],
      tagController: [],
      netInfo: [],
      link: [],

      //Contiene toda la informacion de la red y su configuración
      elements: [],
      netWork: {},

      //Control Modales
      modalActive: "",

      //Varibales para el creador de Topologia desde Plantilla
      numHost: 0,
      topologyType: "",
      depth: "",
      fanout: "",

      //Variable para los Modales de Informacion 
      alertText : '',
      //Variables Creación panel lateral del emulador
      directaccess: [
        {
          id: "cursor",
          src: "cursor.png",
          imgx: 3,
          imgy: 2,
          imgsize: "25",
        },
        {
          id: "controller",
          src: "controller.png",
          imgsize: "22",
        },
        {
          id: "switch",
          src: "openflow_switch.png",
          imgx: 3,
          imgy: 2,
          imgsize: "25",
        },
        {
          id: "host",
          src: "host.png",
          imgx: 3,
          imgy: 2,
          imgsize: "23",
        },
        {
          id: "port",
          src: "port.png",
          imgx: 3,
          imgy: 2,
          imgsize: "23",
        },
        {
          id: "link",
          src: "link.png",
          imgx: 3,
          imgy: 2,
          imgsize: "20",
        },
        {
          id: "label",
          src: "label.png",
          imgx: 3,
          imgy: 2,
          imgsize: "20",
        },
        {
          id: "delete",
          src: "delete.png",
          imgx: 3,
          imgy: 2,
          imgsize: "20",
        },
      ],
    };
  },

  methods: {
    initCanvas() {
      //Declaracion de la variable Fabric para el lienzo Canvas
      const ref = this.$refs.canvas;
      this.canvas = new fabric.Canvas(ref, {
        fireRightClick: true,
        fireMiddleClick: true,
      });

      /* -------------------Eventos del Mouse en el Fabric ------------------- */

      //Evita la creacion de grupos en el Fabric
      this.canvas.on("selection:created", (e) => {
        if (e.target.type === "activeSelection") {
          this.canvas.discardActiveObject();
        } else {
          //do nothing
        }
      });

      this.canvas.on("mouse:wheel", (opt) => {
        if (flag == true) {
          var delta = opt.e.deltaY;
          var zoom = canvas.getZoom();
          zoom *= 0.999 ** delta;
          if (zoom > 20) zoom = 20;
          if (zoom < 0.01) zoom = 0.01;
          this.canvas.setZoom(zoom);
          opt.e.preventDefault();
          opt.e.stopPropagation();
        }
      });

      //Mouse Down Event
      this.canvas.on("mouse:down", (options) => {
        var pointer = this.canvas.getPointer(options.e);
        this.x0 = pointer.x; //get initial starting point of x
        this.y0 = pointer.y; //get initial starting point of y
        switch (this.herramienta) {
          case "cursor":
            $("#cursor").addClass("active");
            if (options.target != null) {
              console.log(options.target.id);
            }
            break;
          case "controller":
            break;
          case "switch":
            break;
          case "host":
            this.imgElement = require("../assets/img/host.png");
            this.tagElement = "h" + (this.tagHost.length + 1);
            this.openModal("host");
            this.herramienta = "cursor";
            break;
          case "port":
            break;
          case "link":
            break;
          case "label":
            break;
          case "delete":
            break;
        }
      });

      //Mouse up event
      this.canvas.on("mouse:up", (e) => {
        // this.panning = false;
        console.log("mu");
        // canvas.selection = true;
      });
      // Move the canvas event
      this.canvas.on("mouse:move", (e) => {
        // if (this.panning && e && e.e) {
        //   var delta = new fabric.Point(e.e.movementX, e.e.movementY);
        //   canvas.relativePan(delta);
        // }
        console.log("mm");
      });
    },

    openModal(mod) {
      var open = mod;
      if (open == "host") {
        return this.$bvModal.show("modal-host");
      }

      if (open == "minimal") {
        this.topologyType = "minimal";
        this.createTopology();
        return 0;
      }
      if (open == "single") {
        this.topologyType = "single";
        return this.$bvModal.show("modal-template");
      }
      if (open == "play") {
        return this.$bvModal.show("modal-IpUser");
      }
      if (open == 'traffic'){
        return this.$bvModal.show("modal-traffic");
      }
      if (open == 'done'){
        return this.$bvModal.show("modal-done");
      }
    },

    closeModal(mod) {
      if (mod == "host") {
        return this.$bvModal.hide("modal-host");
      }
      if (mod == "single") {
        return this.$bvModal.hide("modal-template");
      }
      if (mod == "play") {
        return this.$bvModal.hide("modal-IpUser");
      }
      if (mod == 'traffic'){
        return this.$bvModal.hide("modal-traffic");
      }
      if (mod == 'done'){
        return this.$bvModal.hide("modal-done");
      }
    },

    disableAll() {
      $("#play-direct-access").css("disabled","true");
    },

    loadInfoElements() {
      this.canvas.forEachObject((obj) => {
        //Recopila la información de cada Host
        if (obj.id.charAt(0) == "h") {
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            ipHost: obj.ipHost,
            shedule: obj.sheduler,
            cpuLimit: obj.cpuLimit,
            cpuCores: obj.cpuCores,
          };
          this.elements.push(element);
        } else if (obj.id.charAt(0) == "s") {
          //Recopila la información de cada Switch
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            verbose: obj.verbose,
            batch: obj.batch,
            inNameSpace: obj.inNameSpace,
            inBand: obj.inBand,
            modej: obj.model,
            dataPathArgs: obj.dataPathArgs,
            dataPathIP: obj.dataPathIP,
            dataPath: obj.dataPath,
            protocol: obj.protocol,
            dpctlPort: obj.dpctlPort,
            ipSwitch: obj.ipSwitch,
            stpPriority: obj.stpPriority,
            stp: obj.stp,
            type: obj.type,
          };
          this.elements.push(element);
        } else if (obj.id.charAt(0) == "c") {
          //Recopila la información de cada Controlador
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            type: obj.type,
            iPController: obj.iPController,
            portController: obj.portController,
            protocol: obj.protocol,
          };
          this.elements.push(element);
        } else if (obj.id.charAt(0) == "l") {
          //Recopila la información de cada Asociacion tipo Link
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            loss: obj.loss,
            queue: obj.queue,
            jitter: obj.jitter,
            delay: obj.delay,
            bw: obj.bw,
            connection: obj.connectionLink,
            intfName1: obj.intfName1,
            intfName2: obj.intfName2,
          };
          this.elements.push(element);
        } else if (obj.id.charAt(1) == "a") {
          //Para los Labels identifica la letra a de lAbel - Recopila la información de cada Label
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            label: obj.label,
          };
          elements.push(element);
        } else if (obj.id.charAt(0) == "e") {
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            iPPort: obj.iPPort,
          };
          this.elements.push(element);
        }
      });
    },

    starEmulation() {
      this.loadInfoElements();
      var ipClient = $("#inputIP_xclient").val();
      this.netWork["items"] = this.elements;
      this.netWork["IpClient"] = ipClient;

      console.log("Network Info: " + JSON.stringify(this.netWork));
      var json = JSON.stringify(this.netWork);
      const path = "http://10.55.6.188:5000/";
      axios.post(path, this.netWork).then( (response) => {
        var h1 = $("#text-done");
        var validator = Object.keys(response.data).includes('red');
        console.log(h1.text());
        if (validator == true){
          this.alertText = 'Red Creada Exitosamente';
          this.openModal('done');

        }
      });
      this.closeModal("play");
      this.disableAll();
    },

    stopEmulation() {
      var actionDir = {};
      actionDir["action"] = "stop";
      const path = "http://10.55.6.188:5000/";
      axios.post(path, actionDir).then((response)=> {
        alert(JSON.stringify(response.data));
        this.elements = [];
        this.netWork = {};
      });
    },

    trafficGenerator() {
      var timeEmulation= $('#inputTime').val();
      var lengthPackage = $('#inputLong').val();
      var trafficDir = {};
      trafficDir["TCP"] = "true";
      trafficDir['n'] = String(lengthPackage)+ 'M'
      //trafficDir["t"] = String(timeEmulation);
      trafficDir["global"] = "true";
      this.closeModal('traffic');
      const path = "http://10.55.6.188:5000/";
      axios.post(path, trafficDir).then((response) => {
        var comp = true;
        
        if (comp == true) {
          this.alertText = 'Tráfico Creado Exitosamente';
          console.log(response.data)
          this.openModal('done');

        }else{
          this.alertText = 'Imposible Crear el Tráfico';
          this.openModal('done');
        }
      });
      
    },

    // Creacion elementos Fabric
    makeLink(coords, linkType) {
      if (linkType == "normal") {
        return new fabric.Line(coords, {
          fill: "red",
          stroke: "#9733FA",
          strokeWidth: 2,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          /*   lockMovementX: true,
               lockMovementY: true,
               lockScalingX: true,
               lockScalingY: true,
               lockUniScaling: true,
               lockRotation: true,*/
          // evented: false,
          id: "normal",
        });
      } else if (linkType == "portHost") {
        return new fabric.Line(coords, {
          fill: "yellow",
          stroke: "#E1B13C",
          strokeWidth: 2,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          lockRotation: true,
          // evented: false,
          id: "portHost",
        });
      } else if (linkType == "link") {
        return new fabric.Line(coords, {
          fill: "green",
          stroke: "#2AFE00",
          strokeWidth: 2,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          lockRotation: true,
          //evented: false,
          id: "link",
        });
      } else if (linkType == "portSwitch") {
        return new fabric.Line(coords, {
          fill: "yellow",
          stroke: "#57E3EC",
          strokeWidth: 2,
          selectable: false,
          hasBorders: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockUniScaling: true,
          lockRotation: true,
          //evented: false,
          id: "portSwitch",
        });
      } else {
        return new fabric.Line(coords, {
          strokeDashArray: [5, 5],
          stroke: "blue",
          strokeWidth: 2,
          selectable: false,
          /* lockMovementX: true,
             lockMovementY: true,
             lockScalingX: true,
             lockScalingY: true,
             lockUniScaling: true,
             lockRotation: true,*/
          // evented: false,
          id: "normal",
        });
      }

      return line;

      //
    },

    linkMaker(topo) {
      var pareja;
      var k = [];
      if (topo == "single") {
        // Creador de Pares de Conexión según la Red
        for (var temp = 1; temp <= this.tagHost.length; temp++) {
          pareja = "(s1," + this.tagHost[temp - 1] + ")";
          k[temp - 1] = pareja;
        }
        // console.log("Conexiones:" + k);

        // puntos iniciales del switch
        var xInicial = this.netInfo[this.netInfo.length - 1].rX;
        var yInicial = this.netInfo[this.netInfo.length - 1].rY;

        for (var y = 0; y < this.netInfo.length - 1; y++) {
          var xFinal = this.netInfo[y].rX;
          var yFinal = this.netInfo[y].rY;
          var line = this.makeLink(
            [xInicial + 25, yInicial, xFinal + 28, yFinal + 25],
            "normal"
          );
          this.link[y] = line;

          //canvas.add(line);
        }
      }
    },

    element() {
      if (this.tagElement.charAt(0) == "h") {
        var iPHost = $("#inputFancyIPHost").val();
        var sheduler = $("#optionShedulerFancyHost option:selected").text();
        var cpuLimit = $("#inputFancyCpuLimitHost").val();
        var cpuCores = $("#inputFancyCPUCoresHost").val();
        this.armElement("h");
        // this.createElement("h");
        this.tagHost.push(this.tagElement);

        this.canvas.forEachObject((obj) => {
          if (obj.id == this.tagElement) {
            obj.iPHost = iPHost;
            obj.sheduler = sheduler;
            obj.cpuLimit = cpuLimit;
            obj.cpuCores = cpuCores;
          }
        });
        this.closeModal("host");
      }
    },

    armElement(idElement) {
      var img = new Image();

      img.src = this.imgElement;

      var connection = {
        type: "",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        id: "",
        elementOrigin: "",
        elementFinal: "",
      };

      var elemento = new fabric.Image(img);
      elemento.set({
        scaleX: 0.125,
        scaleY: 0.125,
        padding: 0,
        //id: tag,
        elementConnection: [], // Contiene las conexiones pertenecientes al elmento
        connectionLine: [], // Contiene todos los enlaces (lineas (makeLine())) del elemento
      });

      var text = new fabric.Textbox(this.tagElement, {
        top: 62,
        left: 22,
        fontFamily: "arial",
        fill: "#15435d",
        fontSize: 15,
      });
      if (idElement == "h") {
        var groupHost = new fabric.Group([elemento, text], {
          left: this.x0,
          top: this.y0,
          // opacity: 1,
          hasControls: false,
          hasBorders: false,
          transparentCorners: false,
          selectable: true,
          id: this.tagElement,
          connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[]))
        });

        for (var i = 0; i < 2; i++) {
          connection.type = "association";
          connection.elementOrigin = this.tagElement;
          connection.x1 = this.x0 + 30;
          connection.y1 = this.y0 + 35;
          connection.x2 = this.x0 + i * 65 - 5;
          connection.y2 = this.y0 + 107;
          connection.id = "a" + i;
          elemento.elementConnection.push(connection);

          var link = this.makeLink(
            [connection.x1, connection.y1, connection.x2, connection.y2],
            "portHost"
          );

          elemento.connectionLine.push(link);
          groupHost.connection.push(link);
        }

        // Asociamos el grupo con cada enlace
        for (var i = 0; i < 2; i++) {
          var line = elemento.connectionLine[i];
          groupHost.line = line;
        }
        var port = new Image();
        port.src = require("../assets/img/port.png");

        for (var i = 0; i < 2; i++) {
          var asociate = elemento.elementConnection[i].elementOrigin;

          if (asociate.charAt(0) == "h") {
            var pt = new fabric.Image(port);
            pt.set({
              scaleX: 0.035,
              scaleY: 0.035,
              padding: 0,
              id: this.tagElement,
              connectionLine: [], // Contenedor de las lineas de conexión.
            });
            // Asignación de lineas por cada puerto
            pt.connectionLine.push(elemento.connectionLine[i]);

            var label = new fabric.Textbox("eth" + i, {
              top: 22,
              left: -5,
              fontFamily: "arial",
              fill: "#15435d",
              fontSize: 15,
            });

            var groupHostPort = new fabric.Group([pt, label], {
              left: this.x0 + i * 65 - 15,
              top: this.y0 + 100,
              hasControls: false,
              hasBorders: false,
              transparentCorners: false,
              selectable: true,
              elementContainer: this.tagElement,
              identificator: "Hp",
              id: "eth" + i,
              connection: [], // Contenedor de lineas de conexión del grupo.
            });

            groupHostPort.connection.push(elemento.connectionLine[i]);

            var li = elemento.connectionLine[i];

            // Asignación de lineas por cada puerto en el grupo
            groupHost.li = li;
            this.canvas.add(groupHost.connection[i]);
            this.canvas.add(groupHostPort);
          }
        }

        this.canvas.add(groupHost);
      }
      this.closeModal();
    },

    createTopology() {
      switch (this.topologyType) {
        case "minimal":
          console.log("entras");
          this.topologyType = "single";
          this.numHost = 2;
          this.topologyMaker();
          break;

        case "single":
          var numberHost = $("#inputHostTemplate").val();
          this.numHost = numberHost;
          this.topologyMaker();
          this.closeModal("single");

          break;

        case "linear":
          break;

        case "anillo":
          break;
      }
    },

    insertElementTopology(x, y, image, tag, nHost, topo) {
      var img = new Image();
      img.src = image;

      var connection = {
        type: "",
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        id: "",
        elementOrigin: "",
        elementFinal: "",
      };

      var elemento = new fabric.Image(img);
      elemento.set({
        scaleX: 0.125,
        scaleY: 0.125,
        padding: 0,
        id: tag,
        elementConnection: [], // Contiene las conexiones pertenecientes al elmento
        connectionLine: [], // Contiene todos los enlaces (lineas (makeLine())) del elemento
      });

      var text = new fabric.Textbox(tag, {
        top: 62,
        left: 22,
        fontFamily: "arial",
        fill: "#15435d",
        fontSize: 15,
      });

      if (topo == "single") {
        if (tag.charAt(0) == "h") {
          var groupHost = new fabric.Group([elemento, text], {
            left: x,
            top: y + 160,
            hasControls: false,
            hasBorders: false,
            transparentCorners: false,
            selectable: true,
            id: tag,
            connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[]))
          });

          connection.type = "association";
          connection.elementOrigin = tag;
          connection.x1 = x + 30;
          connection.y1 = y + 195;
          connection.x2 = x + 1 * 65 - 35;
          connection.y2 = y + 107;
          connection.id = "a" + 0;
          elemento.elementConnection.push(connection);

          var link = this.makeLink(
            [connection.x1, connection.y1, connection.x2, connection.y2],
            "portHost"
          );

          elemento.connectionLine.push(link);
          groupHost.connection.push(link);

          var line = elemento.connectionLine[0];
          groupHost.line = line;
          var port = new Image();
          port.src = require("../assets/img/port.png");

          var pt = new fabric.Image(port);
          pt.set({
            scaleX: 0.035,
            scaleY: 0.035,
            padding: 0,
            id: tag,
            connectionLine: [], // Contenedor de las lineas de conexión.
          });

          // Asignación de lineas por cada puerto
          pt.connectionLine.push(elemento.connectionLine[0]);

          var label = new fabric.Textbox("eth" + 0, {
            top: 22,
            left: -5,
            fontFamily: "arial",
            fill: "#15435d",
            fontSize: 15,
          });

          var groupHostPort = new fabric.Group([pt, label], {
            left: x + 1 * 65 - 48,
            top: y + 100,
            hasControls: false,
            hasBorders: false,
            transparentCorners: false,
            selectable: true,
            elementContainer: tag,
            identificator: "Hp", // HostPort
            id: "eth" + 0,
            connection: [], // Contenedor de lineas de conexión del grupo.
          });
          var li = elemento.connectionLine[0];
          groupHostPort.connection.push(elemento.connectionLine[0]);
          groupHost.li = li;
          this.canvas.add(groupHost.connection[0]);
          this.canvas.add(groupHostPort);
          this.canvas.add(groupHost);
          this.tagHost.push(tag);
        } else if (tag.charAt(0) == "s") {
          var groupSwitch = new fabric.Group([elemento, text], {
            left: (nHost * 100) / 2 + 35,
            top: y,
            hasControls: false,
            hasBorders: false,
            transparentCorners: false,
            selectable: true,
            id: tag,
            connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[]))
            type: null,
          });

          // Creación de lineas por cada enlace
          for (var i = 0; i < nHost; i++) {
            connection.type = "association";
            connection.elementOrigin = tag;
            connection.x1 = (nHost * 100) / 2 + 65;
            connection.y1 = y + 35;
            connection.x2 = x + i * 100 + 26;
            connection.y2 = y + 107;
            connection.id = "a" + i;
            elemento.elementConnection.push(connection);

            var link = this.makeLink(
              [connection.x1, connection.y1, connection.x2, connection.y2],
              "portSwitch"
            );

            elemento.connectionLine.push(link);
            groupSwitch.connection.push(link);
          }

          // Asociamos el grupo con cada enlace
          for (var i = 0; i < nHost; i++) {
            var line = elemento.connectionLine[i];
            groupSwitch.line = line;
          }

          var port = new Image();
          port.src = require("../assets/img/port.png");
          for (var i = 0; i < nHost; i++) {
            var asociate = elemento.elementConnection[i].elementOrigin;

            if (asociate.charAt(0) == "s") {
              var pt = new fabric.Image(port);
              pt.set({
                scaleX: 0.035,
                scaleY: 0.035,
                padding: 0,
                id: tag,
                connectionLine: [], // Contenedor de las lineas de conexión.
              });

              // Asignación de lineas por cada puerto
              pt.connectionLine.push(elemento.connectionLine[i]);

              var label = new fabric.Textbox("eth" + i, {
                top: 22,
                left: -5,
                fontFamily: "arial",
                fill: "#15435d",
                fontSize: 15,
              });

              var groupSwitchPort = new fabric.Group([pt, label], {
                //left: (x + (i * 100)) - 19,
                left: x + i * 100 + 15,
                top: y + 100,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                elementContainer: tag,
                identificator: "Sp", //SwitchPort
                id: "eth" + i,
                connection: [], // Contenedor de lineas de conexión del grupo.
              });

              groupSwitchPort.connection.push(elemento.connectionLine[i]);

              var li = elemento.connectionLine[i];

              // Asignación de lineas por cada puerto en el grupo
              groupSwitch.link = li;
              this.canvas.add(groupSwitch.connection[i]);
              this.canvas.add(groupSwitchPort);
            }
          }
          this.canvas.add(groupSwitch);
          this.tagSwitch.push("s" + (this.tagSwitch.length + 1));
        } else if (tag.charAt(0) == "c") {
          var groupController = new fabric.Group([elemento, text], {
            left: (nHost * 100) / 2 + 35,
            top: y,
            hasControls: false,
            hasBorders: false,
            transparentCorners: false,
            selectable: true,
            id: tag,
            connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[]))
            type: null,
          });

          connection.type = "association";
          connection.elementOrigin = tag;
          connection.x2 = (nHost * 100) / 2 + 65;
          connection.y2 = y + 35;
          connection.x1 = (nHost * 100) / 2 + 65;
          connection.y1 = y + 125;
          connection.id = "a" + 0;
          elemento.elementConnection.push(connection);

          var link = this.makeLink(
            [connection.x1, connection.y1, connection.x2, connection.y2],
            "normal"
          );

          elemento.connectionLine.push(link);
          groupController.connection.push(link);

          var line = elemento.connectionLine[0];
          groupController.line = line;

          this.canvas.add(groupController);

          this.tagController.push(tag);
          this.canvas.add(link);
          this.canvas.sendToBack(link);

          this.canvas.forEachObject((obj) => {
            var id1 = "s" + this.tagSwitch.length;

            if (obj.id == id1) {
              obj.link = link;
              obj.connection.push(link);
            }
          });
        }
      }
    },

    obtenerTool(id) {
      // this.$root.$emit('show::modal', 'modal-center');
      // ($("[name='"+id+"']").addClass('active'));
      this.herramienta = id;
    },

    topologyMaker() {
      var posX = [];
      var image = "";
      var pSX = 800;
      var pSY = 2 * 58;
      var pCX = this.tagHost.length * 68;
      var pCY = 20;
      var h = [];
      var s = [];

      if (this.topologyType == "single") {
        if (this.numHost < 2) {
          alert("No es Posible Realizar la Red");
        } else {
          for (var r = 0; r < this.numHost; r++) {
            var pY = 3 * 60;
            posX[r] = (r + 1) * 100; // Separación entre Host
            var obj = {
              value: this.tagHost[this.tagHost.length + r + 1],
              rX: posX[r],
              rY: pY,
            };
            this.netInfo.push(obj);
            h[r] = obj;
          }
          //Insert SwitchOF de la Red Single
          var objt = {
            value: "s1",
            rX: pSX + 20,
            rY: pSY + 20, //Valor de distanciamiento en Y del Host
          };

          this.netInfo.push(objt);
          this.linkMaker(this.topologyType);

          // Insertar Elementos de Red
          for (var a = 0; a < h.length; a++) {
            this.insertElementTopology(
              h[a].rX,
              h[a].rY,
              require("../assets/img/host.png"),
              "h" + (this.tagHost.length + 1),
              this.numHost,
              this.topologyType
            );
          }

          //Inserta el SwithcOF de la Red Single
          this.insertElementTopology(
            101,
            pSY,
            require("../assets/img/openflow_switch.png"),
            "s" + (this.tagSwitch.length + 1),
            this.numHost,
            this.topologyType
          );

          //Inserta el Controller de la Red Single
          this.insertElementTopology(
            pCX,
            pCY,
            require("../assets/img/controller.png"),
            "c" + (this.tagController.length + 1),
            this.numHost,
            this.topologyType
          );

          // Esta sección Crea Los Links y Las Asociaciones al Controlador de la Red Single
          var id0 = [];
          var id1 = "";
          var posX1 = [];
          var posY1 = [];
          var posX2 = [];
          var posY2 = [];
          var objHost = [];
          var objSwitch = [];
          var objController = [];

          for (
            var i = this.tagHost.length - this.numHost;
            i <= this.tagHost.length;
            i++
          ) {
            // Toma los útlimos hosts agregados previamente

            id0.push("h" + (i + 1)); //Armamos el id del host necesitado
            this.canvas.forEachObject((obj) => {
              if (obj.elementContainer && obj.elementContainer == id0[i - 1]) {
                posX2.push(obj.connection[0].x2);
                posY2.push(obj.connection[0].y2);
                objHost.push(obj);
              }
            });
          }

          console.log("tag " + JSON.stringify(this.tagSwitch));

          this.canvas.forEachObject((obj) => {
            id1 = "s" + this.tagSwitch.length;

            if (obj.elementContainer && obj.elementContainer == id1) {
              posX1.push(obj.connection[0].x2);
              posY1.push(obj.connection[0].y2);
              objSwitch.push(obj);
            }
          });

          for (var s = 0; s < posX1.length; s++) {
            var link = this.makeLink(
              [posX1[s], posY1[s], posX2[s], posY2[s]],
              "link"
            );
            this.canvas.add(link);
            this.canvas.sendToBack(link);

            objSwitch[s].state = "connected";
            objHost[s].state = "connected";
            objSwitch[s].connection.push(link);
            objHost[s].connection.push(link);

            objSwitch[s].link = link;
            objHost[s].link = link;

            //Emparejamiento
            link.connectionLink =
              objSwitch[s].elementContainer + "," + objHost[s].elementContainer;
            link.intfName1 =
              objSwitch[s].elementContainer + "-" + objSwitch[s].id;
            link.intfName2 = objHost[s].elementContainer + "-" + objHost[s].id;
          }
        }
      }
    },
  },

  computed: {
    obtenerHerramienta() {
      this.actualTool = this.herramienta;
      return this.actualTool;
    },
  },

  mounted() {
    this.$root.$on("bv::dropdown::show", (bvEvent) => {
      if (bvEvent.componentId === "plantilla") {
        this.isDropdown2Visible = true;
      }
    });
    this.$root.$on("bv::dropdown::hide", (bvEvent) => {
      if (bvEvent.componentId === "plantilla") {
        this.isDropdown2Visible = false;
      }
      if (this.isDropdown2Visible) {
        bvEvent.preventDefault();
      }
    });
    this.initCanvas();
  },
};
</script>

<style >
#container-canvas {
  width: 100%;
  height: 560px;
  overflow-x: scroll;
  overflow-y: scroll;
}
#btn-element {
  height: 45px;
  width: 50px;
}
#bar-lat {
  border: solid 1px #b9d8d4;
}
#canvas-bar {
  height: 560px;
}
#fcanvas {
  position: relative;
  z-index: 0;
  /* background-color: #ecf7f6; */
  /* width: 100%;
  height: 100%; */
  border: solid 1px #b9d8d4;
}
#menu-bar-emulator {
  background-color: #f7fafc;
  border: solid 1px #b9d8d4;
}
#nuevo {
  background-image: url(../assets/img/new_document.png);
  background-size: 25px;
  background-position: 2px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
}
#abrir {
  background-image: url(../assets/img/open.png);
  background-size: 20px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#guardar {
  background-image: url(../assets/img/save.png);
  background-size: 20px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-top: dashed 1px black; */
}
#plantilla {
  background-image: url(../assets/img/template.png);
  background-size: 20px;
  background-position: 4px 8px;
  background-repeat: no-repeat;
}
#salir {
  background-image: url(../assets/img/out.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
}

#deshacer {
  background-image: url(../assets/img/undo.png);
  background-size: 20px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#rehacer {
  background-image: url(../assets/img/redo.png);
  background-size: 20px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#copiar {
  background-image: url(../assets/img/copy.png);
  background-size: 20px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#pegar {
  background-image: url(../assets/img/paste.png);
  background-size: 23px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
}

#seleccion {
  background-image: url(../assets/img/selection.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}
#borrar {
  background-image: url(../assets/img/cut.png);
  background-size: 23px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#iniciarE {
  background-image: url(../assets/img/play.png);
  background-size: 23px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#detenerE {
  background-image: url(../assets/img/stop.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#wireshark {
  background-image: url(../assets/img/analitica.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#graf {
  background-image: url(../assets/img/diagram.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#odl {
  background-image: url(../assets/img/vagueness.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
}

#genTraffic {
  background-image: url(../assets/img/check.png);
  background-size: 28px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 35px;
  /* border-bottom: dashed 1px black; */
}
#doc {
  background-image: url(../assets/img/book.png);
  background-size: 23px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}
#guie {
  background-image: url(../assets/img/guie.png);
  background-size: 25px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
  /* border-bottom: dashed 1px black; */
}

#about {
  background-image: url(../assets/img/about.png);
  background-size: 22px;
  background-position: 3px 4px;
  background-repeat: no-repeat;
  padding-left: 30px;
}

#direct-access-bar {
  border: solid 1px #b9d8d4;
}
#nuevo-direct-access {
  background-image: url(../assets/img/new_document.png);
  background-size: 18px;
  background-position: 4px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#guardar-direct-access {
  background-image: url(../assets/img/save.png);
  background-size: 18px;
  background-position: 5px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#copiar-direct-access {
  background-image: url(../assets/img/copy.png);
  background-size: 18px;
  background-position: 5px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#pegar-direct-access {
  background-image: url(../assets/img/paste.png);
  background-size: 18px;
  background-position: 6px 5px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#undo-direct-access {
  background-image: url(../assets/img/undo.png);
  background-size: 18px;
  background-position: 4px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#redo-direct-access {
  background-image: url(../assets/img/redo.png);
  background-size: 18px;
  background-position: 6px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#play-direct-access {
  background-image: url(../assets/img/play.png);
  background-size: 18px;
  background-position: 5px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#stop-direct-access {
  background-image: url(../assets/img/stop.png);
  background-size: 18px;
  background-position: 5px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#check-direct-access {
  background-image: url(../assets/img/check.png);
  background-size: 18px;
  background-position: 5px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#graf-direct-access {
  background-image: url(../assets/img/analitica.png);
  background-size: 18px;
  background-position: 4px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#diagram-direct-access {
  background-image: url(../assets/img/diagram.png);
  background-size: 18px;
  background-position: 4px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

#odl-direct-access {
  background-image: url(../assets/img/vagueness.png);
  background-size: 18px;
  background-position: 4px 6px;
  background-repeat: no-repeat;
  width: 30px;
  height: 30px;
}

/* Modal Host*/

#buttonModal:hover {
  border: #2ac176 solid 1px;
  outline: none;
  background-color: #2ac176;
  color: white;
}

#buttonModal:hover {
  border: #2ac176 solid 1px;
  outline: none;
  background-color: #2ac176;
  color: white;
}
</style>
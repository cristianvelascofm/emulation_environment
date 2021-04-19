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
        <b-dropdown-item href="#" id="genTraffic" class="p-1"
          >Generador de Tráfico</b-dropdown-item
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

    <!-- Modales de  creacion elementos individuales de red -->

    <!-- Modal Controller -->
    <b-modal id="modal-controller" hide-footer centered title="Controlador">
      <b-container
        id="containerInsertController"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerParameterFancyController" class="ml-3">
          <img
            type="image"
            id="inputInfoController"
            title="Información"
            src="@/assets/img/controller.png"
            width="25px"
            height="30px"
            class="m-0 d-inline"
          />

          <label
            id="labelFancyController d-inline text-center"
            class="ml-2 font-weight-bold text-uppercase"
            >{{ tagElement }}
          </label>
        </b-container>

        <b-container id="containerFormController">
          <b-form id="formularioFancyController" class="p-0">
            <b-row id="containerTypeController" class="m-0 pt-3">
              <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                ><label id="labelTypeFancyController" class="p-0 m-0">
                  Tipo:
                </label></b-col
              >
              <b-col class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <b-select
                  id="optionTypeFancyController"
                  class="p-2 ml-4 text-left"
                  data-default="Por Defecto"
                >
                  <option value="Por Defecto">Por Defecto</option>
                  <option value="OpenFlow Reference Implementation">
                    OpenFlow Reference
                  </option>
                  <option value="NOX">NOX</option>
                  <option value="OVS Controller">OVS Controller</option>
                  <option value="OpenDayLigth">OpenDayLigth</option>
                </b-select>
              </b-col>
            </b-row>

            <b-row id="containerIPController" class="m-0 pt-3">
              <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                ><label id="labelFancyIpController" class="p-0"
                  >IP:</label
                ></b-col
              >
              <b-col class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyIpController"
                  name="fname"
                  placeholder="   0   .   0   .   0   .   0"
                />
              </b-col>
            </b-row>

            <b-row id="containerPortController" class="m-0 pt-3">
              <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                ><label id="labelFancyPuertoController" class="p-0">
                  Puerto:
                </label></b-col
              >
              <b-col class="col-sm-8 col-md-8 col-lg-8 col-xl-8"
                ><b-input
                  type="number"
                  id="inputFancyPuertoController"
                  step="1"
                  min="0"
                  max="65535"
                  class="p-2 ml-4"
              /></b-col>
            </b-row>

            <b-row id="containerProtocolController" class="m-0 pt-3">
              <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4"
                ><label id="labelFancyProtocolController" class="p-0 m-0">
                  Protocolo:
                </label></b-col
              >
              <b-col class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                <b-select
                  id="optionProtocolFancyController"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno" selected="selected">Ninguno</option>
                  <option value="TCP">TCP</option>
                  <option value="SSL">SSL</option>
                </b-select>
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row
          id="containerFancyButtonFormController"
          class="m-0 p-0 text-right"
        >
          <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyController"
              value="Guardar"
              class="m-2"
              @click="element"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyController"
              class="m-2"
              value="Cancelar"
              @click="closeModal('controller')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Switch -->
    <b-modal
      id="modal-switch"
      centered
      title="Switch"
      cancel-title="Cancelar"
      scrollable
    >
      <b-container
        id="containerInsertSwitch"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerParameterFancySwitch" class="ml-3">
          <img
            type="image"
            id="inputInfoSwitch"
            title="Información"
            src="@/assets/img/openflow_switch.png"
            width="25px"
            height="30px"
            class="m-0 d-inline"
          />

          <label
            id="labelFancySwitch d-inline text-center"
            class="ml-2 font-weight-bold text-uppercase"
            >{{ tagElement }}
          </label>
        </b-container>

        <b-container id="containerFormSwitch">
          <b-form id="formularioFancySwitch" class="p-0">
            <b-row id="containerTypeSwitch" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyTypeSwitch" class="p-0 m-0">
                  Tipo:
                </label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-select
                  id="optionTypeFancySwitch"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno">Ninguno</option>
                  <option value="IVS Switch">IVS Switch</option>
                  <option value="Linux Brigde">Linux Brigde</option>
                  <option value="OVS Brigde">OVS Brigde</option>
                  <option value="OVS Switch">OVS Switch</option>
                  <option value="User Switch">User Switch</option>
                </b-select>
              </b-col>
            </b-row>

            <b-row id="containerSTPFancySwitch" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><b-form-checkbox
                  id="checkboxSTPFancySwitch"
                  name="checkbox-STPFancySwitch"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  STP Priority:
                </b-form-checkbox>
              </b-col>
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="number"
                  class="p-2 ml-4"
                  id="inputFancySTPPriority"
                  step="4096"
                  min="4096"
                  max="32768"
                  value="32768"
                />
              </b-col>
            </b-row>

            <b-row id="containerIPSwitch" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyIPSwitch" class="p-0">IP:</label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyIPSwitch"
                  name="fname"
                  placeholder="0       .0       .0       .0"
                />
              </b-col>
            </b-row>

            <b-row id="containerDPCTLPort" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyDPCTLPort" class="p-0"
                  >DPCTL Port:</label
                ></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="number"
                  class="p-2 ml-4"
                  id="inputFancyDPCTLPort"
                  step="1"
                  min="1"
                  max="65535"
                  value="6633"
                />
              </b-col>
            </b-row>

            <b-row id="containerProtocolSwitch" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyProtocolSwitch" class="p-0 m-0">
                  Protocolo:
                </label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6s">
                <b-select
                  id="containerProtocolSwitch"
                  class="p-2 ml-4 text-right"
                  data-default="OpenFlow 1.0"
                >
                  <option value="OpenFlow 1.0">OpenFlow 1.1</option>
                  <option value="OpenFlow 1.2">OpenFlow 1.2</option>
                  <option value="OpenFlow 1.3">OpenFlow 1.3</option>
                  <option value="OpenFlow 1.4">OpenFlow 1.4</option>
                  <option value="OpenFlow 1.5">OpenFlow 1.5</option>
                </b-select>
              </b-col>
            </b-row>

            <b-row id="containerDataPath" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyDataPathSwitch" class="p-0 m-0">
                  DataPath:
                </label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-select
                  id="optionDataPathFancySwitch"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno">Ninguno</option>
                  <option value="Kernel">Kernel</option>
                  <option value="User">User</option>
                </b-select>
              </b-col>
            </b-row>

            <b-row id="containerDataPathID" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyDataPathIDSwitch" class="p-0"
                  >DataPath ID:</label
                ></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyDataPathIDSwitch"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerOfDataPathArguments" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyOfDataPathArgsSwitch" class="p-0"
                  >DataPath Args:</label
                ></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyOfDataPathArgsSwitch"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerFailMode" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><label id="labelFancyFailModeSwitch" class="p-0 m-0">
                  Modelo de Fallas:
                </label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-select
                  id="optionFailModeFancySwitch"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno">Ninguno</option>
                  <option value="Secure">Secure</option>
                  <option value="Standalone">Standalone</option>
                </b-select>
              </b-col>
            </b-row>

            <b-row id="containerCheckBoxOne" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><b-form-checkbox
                  id="InBandFancySwitch"
                  name="checkbox-InBand"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  InBand
                </b-form-checkbox>
                <b-form-checkbox
                  id="InNameSpaceFancySwitch"
                  name="checkbox-inNameSpace"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  In NameSpace
                </b-form-checkbox>
              </b-col>
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-form-checkbox
                  id="BatchFancySwitch"
                  name="checkbox-batch"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Batch
                </b-form-checkbox>
                <b-form-checkbox
                  id="VerboseFancySwitch"
                  name="checkbox-verbose"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  Verbose
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </b-container>

      <!-- BTN GUARDAR GENERAR Y CANCELAR -->
      <template #modal-footer>
        <b-row id="containerBtnSaveSwitch" class="p-0 text-right">
          <b-col class="p-0">
            <b-button
              variant="dark"
              squared
              type="buttonModal"
              id="btnSaveSwitch"
              class="m-2 ml-5"
              @click="element"
              >Ok</b-button
            >

            <b-button
              squared
              variant="dark"
              id="buttonModal"
              class="m-2 mr-4"
              value="Cancelar"
              @click="closeModal('switch')"
              >Cancelar</b-button
            >
          </b-col>
        </b-row>
      </template>
    </b-modal>

    <!-- Modal Host -->
    <b-modal id="modal-host" hide-footer centered title="Host">
      <b-container
        id="containerInsertHost"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container
          id="containerParameterFancyHost"
          class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ml-3"
        >
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
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
                ><label id="labelFancyIPHost" class="p-0"
                  >Ruta por Defecto:</label
                ></b-col
              >
              <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyIPHost"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerShedulerHost" class="m-0 pt-3">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
                ><label id="labelSchedulerFancyHost" class="p-0 m-0">
                  Scheduler:
                </label></b-col
              >
              <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
                <b-select
                  id="optionShedulerFancyHost"
                  class="p-2 ml-4 text-right"
                  data-default="Ninguno"
                >
                  <option value="Ninguno">Ninguno</option>
                  <option value="CFS">CFS</option>
                  <option value="RT">RT</option>
                </b-select>
                <i id="arrowProtocolFancyHost"></i
              ></b-col>
            </b-row>

            <b-row id="containerCPULimitHost" class="m-0 pt-3">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
                ><label id="labelFancyCpuLimitHost" class="p-0">
                  Limite CPU :
                </label></b-col
              >
              <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7"
                ><b-input
                  type="number"
                  id="inputFancyCpuLimitHost"
                  step="1"
                  min="0"
                  max="1"
                  class="p-2 ml-4"
              /></b-col>
            </b-row>

            <b-row id="containerCPUCoresHost" class="m-0 pt-3">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
                ><label id="labelFancyCPUCoreHost" class="p-0">
                  Núcleos CPU :
                </label></b-col
              >
              <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7"
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
          <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyHost"
              value="Guardar"
              class="m-2"
              @click="element"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyHost"
              class="m-2"
              value="Cancelar"
              @click="closeModal('host')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Puerto -->
    <b-modal id="modal-port" hide-footer centered title="Puerto">
      <b-container
        id="containerInsertPort"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormPort">
          <b-form id="formularioFancyPort" class="p-0">
            <b-row id="containerPort" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <img
                  type="image"
                  id="inputInfoPort"
                  title="Información"
                  src="@/assets/img/port.png"
                  width="25px"
                  height="30px"
                  class="m-0 d-inline mr-3"
                />
                <label id="labelFancyPort" class="p-0">Puerto:</label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyPort"
                  name="fname"
                />
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormPort" class="m-0 p-0 text-right">
          <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyPort"
              value="Guardar"
              class="m-2"
              @click="element"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyPort"
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

    <!-- Modal Link -->
    <b-modal id="modal-link" hide-footer centered title="Enlace">
      <b-container
        id="containerInsertLink"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormLink">
          <b-form id="formularioFancyLink" class="p-0">
            <b-row id="containerBandWidthLink" class="m-0 pt-1">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <label id="labelFancyBandWidthLink">Ancho de Banda:</label>
              </b-col>

              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <b-input
                  type="number"
                  id="inputFancyBandWidthLink"
                  step="1"
                  min="0"
                  max="10000000000000"
                  class="p-2"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >Mb/s</label
                ></b-col
              >
            </b-row>

            <b-row id="containerDelayLink" class="m-0 pt-1">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <label id="labelFancyDelayLink" class="pt-2">Retardo:</label>
              </b-col>

              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <b-input
                  type="number"
                  id="inputFancyDelayLink"
                  step="1"
                  min="0"
                  max="10000000000000"
                  class="p-2"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >ms</label
                ></b-col
              >
            </b-row>

            <b-row id="containerJitterLink" class="m-0 pt-1">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <label id="labelFancyJitterLink" class="pt-2">Jitter:</label>
              </b-col>

              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <b-input
                  type="number"
                  id="inputFancyJitterLink"
                  step="1"
                  min="0"
                  max="10000000000000"
                  class="p-2"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >ms</label
                ></b-col
              >
            </b-row>

            <b-row id="containerMaxQueueLink" class="m-0 pt-1">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <label id="labelFancyMaxQueueLink" class="pt-2"
                  >Cola Máxima:</label
                >
              </b-col>

              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <b-input
                  type="number"
                  id="inputFancyMaxQueueLink"
                  step="1"
                  min="0"
                  max="10000000000000"
                  class="p-2"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >Paquetes</label
                ></b-col
              >
            </b-row>

            <b-row id="containerLossLink" class="m-0 pt-1">
              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <label id="labelFancyLossLink" class="pt-2">Perdidas:</label>
              </b-col>

              <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
                <b-input
                  type="number"
                  id="inputFancyLossLink"
                  step="1"
                  min="0"
                  max="100"
                  class="p-2"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >%</label
                ></b-col
              >
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormLink" class="m-0 p-0 text-right">
          <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyLink"
              value="Guardar"
              class="m-2"
              @click="element"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyLink"
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

    <!-- Modal Etiqueta -->
    <b-modal id="modal-label" hide-footer centered title="Etiqueta">
      <b-container
        id="containerInsertLabel"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormLabel">
          <b-form id="formularioFancyLabel" class="p-0">
            <b-row id="containerLabel" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <img
                  type="image"
                  id="inputInfoLabel"
                  title="Información"
                  src="@/assets/img/label.png"
                  width="25px"
                  height="30px"
                  class="m-0 d-inline"
                />
                <label id="labelFancyLabel" class="p-0">Etiqueta:</label></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputFancyLabel"
                  name="fname"
                />
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormLabel" class="m-0 p-0 text-right">
          <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
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
              @click="closeModal('label')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Detector IP Usuario -->
    <b-modal id="modal-IpUser" hide-footer centered title="Configurción IP">
      <b-container
        id="containerIpUser"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerForm_IP_xclient">
          <b-form id="formulario_IP_xclient" class="p-0">
            <b-row id="containerIp" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label id="labelIP" class="p-0">IP Local:</label>
              </b-col>

              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputIP_xclient"
                  name="fname"
                />
              </b-col>
            </b-row>

            <b-row id="containerBtnSave" class="mt-2 p-0 text-right">
              <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
      <b-container
        id="containerInsertTemplate"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormTemplate">
          <b-form id="formularioFancyHostTemplate" class="p-0">
            <b-row id="containerTemlate" class="m-0 pt-3">
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <img
                  type="image"
                  id="inputInfoHostTemplate"
                  title="Información"
                  src="@/assets/img/host.png"
                  width="25px"
                  height="30px"
                  class="m-0 d-inline mr-3"
                />
                <label id="labelHostTemplate" class="p-0"
                  >Número de Host:</label
                ></b-col
              >
              <b-col class="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-input
                  type="text"
                  class="p-2 ml-4"
                  id="inputHostTemplate"
                  name="fname"
                />
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormTemplate" class="m-0 p-0 text-right">
          <b-col class="p-0"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyTemplate"
              value="Guardar"
              class="m-2"
              @click="createTopology"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyTemplate"
              class="m-2"
              value="Cancelar"
              @click="closeModal('single')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Done -->
    <b-modal id="modal-done" hide-footer centered title="RESULTADO">
      <b-container
        id="containerDone"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormDone">
          <b-form id="formularioFancyDone" class="p-0">
            <b-row id="containerDone" class="m-0 pt-3">
              <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h1 class="p-0 m-0" id="H1FancyDone">{{ alertText }}</h1>
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormDone" class="m-0 p-0 text-right">
          <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0"
            ><b-button
              variant="dark"
              squared
              type="button"
              id="GuardarButtonFancyDone"
              value="Guardar"
              class="m-2"
              @click="closeModal('done')"
              >Ok</b-button
            >
          </b-col>
        </b-row>
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
      <b-container
        id="containerForm_traffic"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-form id="formulario_traffic" class="p-0">
          <b-row id="containerSelectorraffic" class="m-0 pt-2">
            <b-col class="m-0 pt-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <label id="labelSelectorTraffic" class="p-0 m-0">
                Seleccione el tipo de Tráfico:
              </label>
            </b-col>

            <b-col class="mt-0 mr-0 pt-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
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
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
                >Establezca los parametros de tráfico
              </label>
            </b-col>
          </b-row>

          <!-- FILA PARAMETRO DE TIEMPO -->
          <b-row id="parameterTime" class="m-0 pt-1">
            <b-col class="p-1 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio name="option-radios" value="time" id="radioTime">
                Tiempo de Emulación:
              </b-form-radio>
            </b-col>

            <b-col class="p-0 ml-5 col-sm-5 col-md-5 col-lg-5 col-xl-5"
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
              id="buttonModal"
              class="m-2 ml-5"
              @click="trafficGenerator"
              >Ok</b-button
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

    <!-- Modal Analizador Grafico de Tráfico -->
    <b-modal
      id="modal-grafic"
      centered
      title="Analizador Grafico de Red"
      cancel-title="Cancelar"
      scrollable
      size="xl"
    >
      <b-container id="containerGrafic" class="">
        <b-container id="containerFormGrafic">
          <b-form id="formularioFancyGrafic" class="p-0">
            <b-row class="mt-0">
              <b-col class="mt-0">
                <b-row id="containerCanvaGraphic">
                  <canvas id="graphic" class="d-none"></canvas>
                  <canvas id="graphic2" class="d-none"></canvas>
                </b-row>
              </b-col>

              <b-col id="containerFancyInfoGraphicTCPClient" class="mt-0">
                <b-row id="continerSelectClientServer" class="col-12 mt-0">
                  <b-col class="col-3">
                    <label id="labelSelectServerClientTCP" class="p-0 m-0">
                      Seleccione:
                    </label>
                  </b-col>

                  <b-col class="col-5">
                    <b-select id="optionSelectServerClientTCP" size="sm">
                      <option id="serverTCP">Servidor</option>
                      <option id="clientTCP">Cliente</option>
                    </b-select>
                  </b-col>

                  <b-col class="col-4">
                    <b-button
                      squared
                      variant="dark"
                      id="buttonModal"
                      value="Visualizar"
                      size="sm"
                      >Visualizar
                    </b-button>
                  </b-col>
                </b-row>
                <!-- TCP CLIENTE -->
                <b-row id="continerParameterTcpClient" class="m-0 d-none">
                  <b-row id="continerLabelMeter" class="m-0 mt-0 col-12">
                    <b-col
                      ><label
                        id="labelparameterMeter"
                        class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                      >
                        MÉTRICAS DE DESEMPEÑO
                      </label></b-col
                    >
                  </b-row>

                  <b-row id="continerParameter_modo_op" class="mt-0 col-12">
                    <b-col class="col-6">
                      <label id="labelparameter_modo_op">Modo Operación:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_modo_op_tcp_client"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_protocol" class="mt-0 col-12">
                    <b-col class="col-6">
                      <label id="labelparameter_protocol">Protocolo:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_protocol_tcp_client"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_duration" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_duration">Duración:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_duration"
                        name="fname"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_size_block" class="mt-0 col-12">
                    <b-col class="col-6">
                      <label id="labelparameter_size_block"
                        >Tamaño de Bloque:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class="ml-0"
                        id="input_size_block"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_bloque" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_bloque">Bloques:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_bloque"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_tcp_mss" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_tcp_mss">TCP MSS:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_tcp_mss"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_snd_buffer" class="mt-0 col-12">
                    <b-col class="col-6">
                      <label id="labelparameter_snd_buffer"
                        >Buffer Envió:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_snd_buffer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_rcv_buffer" class="mt-0 col-12">
                    <b-col class="col-6">
                      <label id="labelparameter_rcv_buffer"
                        >Buffer Recepción:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_rcv_buffer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_total_bytes" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_total_bytes"
                        >Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_total_bytes"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_tbytes" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_tbytes"
                        >Prom Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_tbytes"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_bit" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_bit"
                        >Prom Bit por Seg:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_bit"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_sndcwnd"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_sndcwnd"
                        >Prom SND CWND:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_sndcwnd"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_rtt" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_rtt">Prom RTT:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_rtt"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_rtx" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_rtx">Prom R-Tx:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_rtx"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_rttvar" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_rttvar"
                        >Prom RTTVAR:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_rttvar"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row id="continerParameter_prom_pmtu" class="col-12 mt-0">
                    <b-col class="col-6">
                      <label id="labelparameter_prom_pmtu">Prom PMTU:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_pmtu"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>
                </b-row>
                <!-- TCP SERVER -->
                <b-row id="continerParameterTcpServer" class="m-0 d-none">
                  <b-row id="continerLabelMeter" class="m-0 mt-0 col-12">
                    <b-col
                      ><label
                        id="labelparameterMeter"
                        class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                      >
                        MÉTRICAS DE DESEMPEÑO
                      </label></b-col
                    >
                  </b-row>

                  <b-row
                    id="continerParameter_modo_op_Server"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_modo_op_Server"
                        >Modo Operación:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_modo_op_tcp_Server"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_protocol_Server"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_protocol_Server"
                        >Protocolo:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_protocol_tcp_Server"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_duration_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_duration_Server"
                        >Duración:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_duration_Server"
                        name="fname"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_size_block_Server"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_size_block_Server"
                        >Tamaño de Bloque:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class="ml-0"
                        id="input_size_block_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_bloque_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_bloque_Server">Bloques:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_bloque_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_tcp_mss_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_tcp_mss_Server">TCP MSS:</label>
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_tcp_mss_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_snd_buffer_Server"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_snd_buffer_Server"
                        >Buffer Envió:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_snd_buffer_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_rcv_buffer_Server"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_rcv_buffer_Server"
                        >Buffer Recepción:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_rcv_buffer_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_total_bytes_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_total_bytes_Server"
                        >Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_total_bytes_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_tbytes_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_tbytes_Server"
                        >Prom Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_tbytes_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_bit_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_bit_Server"
                        >Prom Bit por Seg:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_bit_Server"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>
                </b-row>
                <!-- UDP CLIENTE -->
                <b-row id="continerParameterUDPClient" class="m-0 d-none">
                  <b-row
                    id="continerLabelMeterUDPClient"
                    class="m-0 mt-0 col-12"
                  >
                    <b-col
                      ><label
                        id="labelparameterMeterUDPClient"
                        class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                      >
                        MÉTRICAS DE DESEMPEÑO
                      </label></b-col
                    >
                  </b-row>

                  <b-row
                    id="continerParameter_modo_op_UDPClient"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_modo_op_UDPClient"
                        >Modo Operación:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_modo_op_UDPClient"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_protocol_UDPClient"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_protocol_UDPClient"
                        >Protocolo:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_protocol_tcp_UDPClient"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_duration_Server"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_duration_UDPClient"
                        >Duración:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_duration_UDPClient"
                        name="fname"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_size_block_UDPClient"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_size_block_UDPClient"
                        >Tamaño de Bloque:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class="ml-0"
                        id="input_size_block_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_bloque_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_bloque_UDPClient"
                        >Bloques:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_bloque_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_snd_buffer_UDPClient"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_snd_buffer_UDPClient"
                        >Buffer Envió:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_snd_buffer_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_rcv_buffer_UDPClient"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_rcv_buffer_UDPClient"
                        >Buffer Recepción:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_rcv_buffer_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_total_bytes_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_total_bytes_UDPClient"
                        >Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_total_bytes_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_tbytes_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_tbytes_UDPClient"
                        >Prom Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_tbytes_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_bit_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_bit_UDPClient"
                        >Prom Bit por Seg:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_bit_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_jitter_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_jitter_UDPClient"
                        >Jitter:</label
                      >
                    </b-col>
                    <b-col class="col-5">
                      <b-input
                        type="text"
                        class=""
                        id="input_jitter_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                    <b-col class="col-1 pl-0">
                      <label id="labelparameterMeter_jitter_UDPClient"
                        >ms</label
                      >
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_packet_UDPClient"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_packet_UDPClient"
                        >Paquetes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_packet_UDPClient"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>
                </b-row>
                <!-- UDP CLIENTE -->
                <b-row id="continerParameterUDPServer" class="m-0 d-none">
                  <b-row
                    id="continerLabelMeterUDPServer"
                    class="m-0 mt-0 col-12"
                  >
                    <b-col
                      ><label
                        id="labelparameterMeterUDPServer"
                        class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                      >
                        MÉTRICAS DE DESEMPEÑO
                      </label></b-col
                    >
                  </b-row>

                  <b-row
                    id="continerParameter_modo_op_UDPServer"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_modo_op_UDPServer"
                        >Modo Operación:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_modo_op_UDPServer"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_protocol_UDPServer"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_protocol_UDPServer"
                        >Protocolo:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_protocol_tcp_UDPServer"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_duration_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_duration_UDPServer"
                        >Duración:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_duration_UDPServer"
                        name="fname"
                        size="sm"
                        class=""
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_size_block_UDPServer"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_size_block_UDPServer"
                        >Tamaño de Bloque:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class="ml-0"
                        id="input_size_block_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_bloque_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_bloque_UDPServer"
                        >Bloques:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        id="input_bloque_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_snd_buffer_UDPServer"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_snd_buffer_UDPServer"
                        >Buffer Envió:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_snd_buffer_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_rcv_buffer_UDPServer"
                    class="mt-0 col-12"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_rcv_buffer_UDPServer"
                        >Buffer Recepción:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_rcv_buffer_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_total_bytes_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_total_bytes_UDPServer"
                        >Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_total_bytes_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_tbytes_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_tbytes_UDPServer"
                        >Prom Total Bytes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_tbytes_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_prom_bit_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_prom_bit_UDPServer"
                        >Prom Bit por Seg:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_prom_bit_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_jitter_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_jitter_UDPServer"
                        >Jitter:</label
                      >
                    </b-col>
                    <b-col class="col-5">
                      <b-input
                        type="text"
                        class=""
                        id="input_jitter_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                    <b-col class="col-1 pl-0">
                      <label id="labelparameterMeter_jitter_UDPServer"
                        >ms</label
                      >
                    </b-col>
                  </b-row>

                  <b-row
                    id="continerParameter_packet_UDPServer"
                    class="col-12 mt-0"
                  >
                    <b-col class="col-6">
                      <label id="labelparameter_packet_UDPServer"
                        >Paquetes:</label
                      >
                    </b-col>
                    <b-col class="col-6">
                      <b-input
                        type="text"
                        class=""
                        id="input_packet_UDPServer"
                        name="fname"
                        size="sm"
                      />
                    </b-col>
                  </b-row>
                </b-row>
              </b-col>
            </b-row>
          </b-form>
        </b-container>
      </b-container>

      <!-- BTN GUARDAR GENERAR Y CANCELAR -->
      <template #modal-footer>
        <b-row id="containerBtnSaveGrafic" class="p-0 text-right">
          <b-col class="p-0">
            <b-button
              squared
              variant="dark"
              id="buttonModal"
              class="m-2 mr-4"
              value="Cancelar"
              @click="closeModal('graphic')"
              >Cerrar</b-button
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
      flag: true,
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
      alertText: "",
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
        if (this.flag == true) {
          var delta = opt.e.deltaY;
          var zoom = this.canvas.getZoom();
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
            this.imgElement = require("../assets/img/controller.png");
            this.tagElement = "c" + (this.tagController.length + 1);
            this.openModal("controller");
            this.herramienta = "cursor";
            break;
          case "switch":
            this.imgElement = require("../assets/img/openflow_switch.png");
            this.tagElement = "s" + (this.tagSwitch.length + 1);
            this.openModal("switch");
            this.herramienta = "cursor";
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
      if (open == "controller") {
        return this.$bvModal.show("modal-controller");
      }
      if (open == "switch") {
        return this.$bvModal.show("modal-switch");
      }
      if (open == "label") {
        return this.$bvModal.show("modal-label");
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
      if (open == "traffic") {
        return this.$bvModal.show("modal-traffic");
      }
      if (open == "done") {
        return this.$bvModal.show("modal-done");
      }
    },

    closeModal(mod) {
      if (mod == "host") {
        return this.$bvModal.hide("modal-host");
      }
      if (mod == "switch") {
        return this.$bvModal.hide("modal-switch");
      }
      if (mod == "controller") {
        return this.$bvModal.hide("modal-controller");
      }
      if (mod == "single") {
        return this.$bvModal.hide("modal-template");
      }
      if (mod == "play") {
        return this.$bvModal.hide("modal-IpUser");
      }
      if (mod == "traffic") {
        return this.$bvModal.hide("modal-traffic");
      }
      if (mod == "done") {
        return this.$bvModal.hide("modal-done");
      }
    },

    disableAll() {
      $("#play-direct-access").css("disabled", "true");
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
      axios.post(path, this.netWork).then((response) => {
        var h1 = $("#text-done");
        var validator = Object.keys(response.data).includes("red");
        console.log(h1.text());
        if (validator == true) {
          this.alertText = "Red Creada Exitosamente";
          this.openModal("done");
        }
      });
      this.closeModal("play");
      this.disableAll();
    },

    stopEmulation() {
      var actionDir = {};
      actionDir["action"] = "stop";
      const path = "http://10.55.6.188:5000/";
      axios.post(path, actionDir).then((response) => {
        alert(JSON.stringify(response.data));
        this.elements = [];
        this.netWork = {};
      });
    },

    trafficGenerator() {
      var timeEmulation = $("#inputTime").val();
      var lengthPackage = $("#inputLong").val();
      var trafficDir = {};
      trafficDir["TCP"] = "true";
      trafficDir["n"] = String(lengthPackage) + "M";
      //trafficDir["t"] = String(timeEmulation);
      trafficDir["global"] = "true";
      this.closeModal("traffic");
      const path = "http://10.55.6.188:5000/";
      axios.post(path, trafficDir).then((response) => {
        var comp = true;

        if (comp == true) {
          this.alertText = "Tráfico Creado Exitosamente";
          console.log(response.data);
          this.openModal("done");
        } else {
          this.alertText = "Imposible Crear el Tráfico";
          this.openModal("done");
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
      } else if (this.tagElement.charAt(0) == "s") {
        var type = $("#optionTypeFancySwitch option:selected").text();
        var stp = $("#STPFancySwitch:checkbox:checked").val();
        var stpPriority = $("#inputFancySTPPriority").val();
        var ipSwitch = $("#inputFancyIPSwitch").val();
        var dpctlPort = $("#inputFancyDPCTLPort").val();
        var protocol = $("#optionProtocolFancySwitch option:selected").text();
        var dataPath = $("#optionDataPathFancySwitch option:selected").text();
        var dataPathIP = $("#inputFancyDataPathIDSwitch").val();
        var dataPathArgs = $("#inputFancyOfDataPathArgsSwitch").val();
        var model = $("#optionFailModeFancySwitch option:selected").text();
        var inBand = $("#InBandFancySwitch:checkbox:checked").val();
        var inNameSpace = $("#InNameSpaceFancySwitch:checkbox:checked").val();
        var batch = $("#BatchFancySwitch:checkbox:checked").val();
        var verbose = $("#VerboseFancySwitch:checkbox:checked").val();
        this.armElement("s");
        this.tagSwitch.push(this.tagElement);

        this.canvas.forEachObject((obj) => {
          if (obj.id == this.tagElement) {
            obj.verbose = verbose;
            obj.batch = batch;
            obj.inNameSpace = inNameSpace;
            obj.inBand = inBand;
            obj.model = model;
            obj.dataPathArgs = dataPathArgs;
            obj.dataPathIP = dataPathIP;
            obj.dataPath = dataPath;
            obj.protocol = protocol;
            obj.dpctlPort = dpctlPort;
            obj.ipSwitch = ipSwitch;
            obj.stpPriority = stpPriority;
            obj.stp = stp;
            obj.type = type;
          }
        });
      } else if (this.tagElement.charAt(0) == "c") {
        var type = $("#optionTypeFancyController option:selected").text();
        var iPController = $("#inputFancyIpController").val();
        var portController = $("#inputFancyPuertoController").val();
        var protocol = $(
          "#optionProtocolFancyController option:selected"
        ).text();
        this.armElement("c");
        this.tagController.push(this.tagElement);
        this.canvas.forEachObject((obj) => {
          if (obj.id && obj.id === tag) {
            obj.type = type;
            obj.iPController = iPController;
            obj.portController = portController;
            obj.protocol = protocol;
          }
        });
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

      // Si el elemento es un Host
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
      } else if (idElement == "s") {
        var groupSwitch = new fabric.Group([elemento, text], {
          left: this.x0,
          top: this.y0,
          hasControls: false,
          hasBorders: false,
          transparentCorners: false,
          selectable: true,
          id: this.tagElement,
          connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[]))
        });

        // Creación de lineas por cada enlace
        for (var i = 0; i < 6; i++) {
          connection.type = "association";
          connection.elementOrigin = idElement;
          connection.x1 = this.x0 + 30;
          connection.y1 = this.y0 + 35;
          connection.x2 = this.x0 + i * 65 - 130;
          connection.y2 = this.y0 + 107;
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
        for (var i = 0; i < 6; i++) {
          var line = elemento.connectionLine[i];
          groupSwitch.line = line;
        }

        var port = new Image();
        port.src = require("../assets/img/port.png");

        // Creación de puertos por cada enlace.
        for (var i = 0; i < 6; i++) {
          var asociate = elemento.elementConnection[i].elementOrigin;

          if (asociate.charAt(0) == "s") {
            var pt = new fabric.Image(port);
            pt.set({
              scaleX: 0.035,
              scaleY: 0.035,
              opacity: 1,
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

            var groupSwitchPort = new fabric.Group([pt, label], {
              left: this.x0 + i * 65 - 143,
              top: this.y0 + 100,
              hasControls: false,
              hasBorders: false,
              transparentCorners: false,
              selectable: true,
              elementContainer: this.tagElement,
              identificator: "Sp",
              id: "eth" + i,
              connection: [], // Contenedor de lineas de conexión del grupo.
            });

            groupSwitchPort.connection.push(elemento.connectionLine[i]);

            var li = elemento.connectionLine[i];

            // Asignación de lineas por cada puerto en el grupo
            groupSwitch.li = li;
            this.canvas.add(groupSwitch.connection[i]);
            this.canvas.add(groupSwitchPort);
          }
        }

        this.canvas.add(groupSwitch);
        this.closeModal("switch");
      } else if (idElement == 'c'){
        
        var groupController = new fabric.Group([elemento, text], {

            left: this.x0,
            top: this.y0,
            hasBorders: false,
            hasControls: false,
            transparentCorners: false,
            selectable: true,
            id: this.tagElement,
            connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[])) 
        });
        this.canvas.add(groupController);
        this.closeModal('controller');
      }
      
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
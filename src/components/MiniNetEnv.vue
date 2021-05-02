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
        @click="openModal('done')"
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
        @click="openModal('grafic')"
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
        <b-container
          id="containerParameterFancyController"
          class="ml-3 text-center"
        >
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
            <!-- Type Controller -->
            <b-container id="container-type" class="form-group">
              <label for="labelType" class="mt-2">Tipo</label>
              <select
                id="optionTypeFancyController"
                class="form-control form-control"
              >
                <option value="Por Defecto" selected="selected">
                  Por Defecto
                </option>
                <option value="OpenFlow Reference Implementation">
                  OpenFlow Reference
                </option>
                <option value="NOX">NOX</option>
                <option value="OVS Controller">OVS Controller</option>
                <option value="OpenDayLigth">OpenDayLigth</option>
              </select>
            </b-container>

            <!-- IP Controller -->
            <b-container id="container-Ip" class="form-group">
              <label for="labelType" class="mt-1">IP</label>
              <input
                id="inputFancyIpController"
                type="text"
                class="form-control text-right"
                placeholder="0   .   0   .   0   .   0"
              />
            </b-container>

            <!-- Port Controller -->
            <b-container id="containerPortController" class="form-group">
              <label
                id="labelFancyPuertoController"
                for="labelType"
                class="mt-1"
                >Puerto</label
              >
              <input
                id="inputFancyIpController"
                type="number"
                class="form-control text-right"
                step="1"
                min="1"
                max="65535"
              />
            </b-container>

            <!-- Protocol Controller -->
            <b-container id="containerProtocolController" class="form-group">
              <label
                for="labelType"
                id="labelFancyProtocolController"
                class="mt-1"
                >Protocolo</label
              >
              <select
                id="optionTypeFancyController"
                class="form-control form-control"
              >
                <option value="Ninguno" selected="selected">Ninguno</option>
                <option value="TCP">TCP</option>
                <option value="SSL">SSL</option>
              </select>
            </b-container>
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
    </b-modal>

    <!-- Modal Switch -->
    <b-modal
      id="modal-switch"
      centered
      title="Switch"
      cancel-title="Cancelar"
      scrollable
      header-bg-variant="light"
      header-text-variant="dark"
    >
      <template #modal-header>
        <!-- Emulate built in modal header close button action -->
        <b-row class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
            <b-icon icon="question-circle-fill" aria-label="dark"></b-icon>
            <b-button        
              size="sm"
              pill
              class="ml-2"
              variant="outline-ligth"
              @click="openInfoModal('switch')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Switch</h5>
          </b-col>
        </b-row>
      </template>

      <b-container
        id="containerInsertSwitch"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <!-- Elment switch -->
        <b-container
          id="containerParameterFancySwitch"
          class="ml-3 text-center"
        >
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
            <!-- Type Switch -->
            <b-container id="containerTypeSwitch" class="form-group">
              <label for="labelType" id="labelFancyTypeSwitch" class="mt-1"
                >Tipo</label
              >
              <select
                id="optionTypeFancySwitch"
                class="form-control form-control"
              >
                <option value="Ninguno" selected>Ninguno</option>
                <option value="IVS Switch">IVS Switch</option>
                <option value="Linux Brigde">Linux Brigde</option>
                <option value="OVS Brigde">OVS Brigde</option>
                <option value="OVS Switch">OVS Switch</option>
                <option value="User Switch">User Switch</option>
              </select>
            </b-container>

            <!-- STP Switch -->
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
                  class="p-2 ml-3"
                  id="inputFancySTPPriority"
                  step="4096"
                  min="4096"
                  max="32768"
                  value="32768"
                />
              </b-col>
            </b-row>

            <!-- IP Switch -->
            <b-container id="containerIPSwitch" class="form-group">
              <label id="labelFancyIPSwitch" for="labelType" class="mt-1"
                >IP</label
              >
              <input
                id="labelFancyIPSwitch"
                type="text"
                class="form-control text-right"
                placeholder="0   .   0   .   0   .   0"
              />
            </b-container>

            <!-- Port Switch -->
            <b-container id="containerDPCTLPort" class="form-group">
              <label id="labelFancyDPCTLPort" for="labelType" class="mt-1"
                >DPCTL Port</label
              >
              <input
                id="inputFancyDPCTLPort"
                type="number"
                class="form-control text-right"
                step="1"
                min="1"
                max="65535"
              />
            </b-container>

            <!-- Protocol Switch -->
            <b-container id="containerProtocolSwitch" class="form-group">
              <label for="labelType" id="labelFancyProtocolSwitch" class="mt-1"
                >Protocolo</label
              >
              <select
                id="containerProtocolSwitch"
                class="form-control form-control"
              >
                <option value="OpenFlow 1.0" selected>OpenFlow 1.1</option>
                <option value="OpenFlow 1.2">OpenFlow 1.2</option>
                <option value="OpenFlow 1.3">OpenFlow 1.3</option>
                <option value="OpenFlow 1.4">OpenFlow 1.4</option>
                <option value="OpenFlow 1.5">OpenFlow 1.5</option>
              </select>
            </b-container>

            <!-- DataPath Switch -->
            <b-container id="containerDataPath" class="form-group">
              <label for="labelType" id="labelFancyProtocolSwitch" class="mt-1"
                >DataPath</label
              >
              <select
                id="optionDataPathFancySwitch"
                class="form-control form-control"
              >
                <option value="Ninguno" selected>Ninguno</option>
                <option value="Kernel">Kernel</option>
                <option value="User">User</option>
              </select>
            </b-container>

            <!-- DataPathID Switch -->
            <b-container id="containerDataPathID" class="form-group">
              <label id="labelFancyDataPathIDSwitch" class="mt-1"
                >DataPath ID</label
              >
              <input
                id="inputFancyDataPathIDSwitch"
                type="text"
                class="form-control text-right"
              />
            </b-container>

            <!-- DataPathArguments Switch -->
            <b-container id="containerOfDataPathArguments" class="form-group">
              <label id="labelFancyDataPathIDSwitch" class="mt-1"
                >Data Path Arguments</label
              >
              <input
                id="inputFancyOfDataPathArgsSwitch"
                type="text"
                class="form-control text-right"
              />
            </b-container>

            <!-- FailMode Switch -->
            <b-container id="containerFailMode" class="form-group">
              <label for="labelType" id="labelFancyFailModeSwitch" class="mt-1"
                >Modelo de Fallas</label
              >
              <select
                id="optionFailModeFancySwitch"
                class="form-control form-control"
              >
                <option value="Ninguno" selected>Ninguno</option>
                <option value="Secure">Secure</option>
                <option value="Standalone">Standalone</option>
              </select>
            </b-container>

            <b-row id="containerCheckBoxOne" class="m-0 pt-3">
              <b-col class="pl-5 col-sm-6 col-md-6 col-lg-6 col-xl-6"
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
              <b-col class="pl-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
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
          class="col-sm-12 col-md-12 col-lg-12 col-xl-12 ml-3 text-center"
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
            <!-- IP Host -->
            <b-container id="containerIPHost" class="form-group">
              <label id="labelFancyIPHost" class="mt-1">Ruta por Defecto</label>
              <input
                id="inputFancyIPHost"
                type="text"
                class="form-control text-right"
                placeholder="0   .   0   .   0   .   0"
              />
            </b-container>

            <!-- Sheduler Host -->
            <b-container id="containerShedulerHost" class="form-group">
              <label id="labelSchedulerFancyHost" class="mt-2">Scheduler</label>
              <select
                id="optionShedulerFancyHost"
                class="form-control form-control"
              >
                <option value="Ninguno" selected>Ninguno</option>
                <option value="CFS">CFS</option>
                <option value="RT">RT</option>
              </select>
            </b-container>

            <!-- CPU Host -->
            <b-container id="containerCPULimitHost" class="form-group">
              <label id="labelFancyCpuLimitHost" for="labelType" class="mt-1"
                >Limite CPU</label
              >
              <input
                type="number"
                id="inputFancyCpuLimitHost"
                class="form-control text-right"
                step="1"
                min="0"
              />
            </b-container>

            <!-- CPU Core Host -->
            <b-container id="containerCPUCoresHost" class="form-group">
              <label id="labelFancyCPUCoreHost" for="labelType" class="mt-1"
                >Núcleos CPU</label
              >
              <input
                type="number"
                id="inputFancyCPUCoresHost"
                class="form-control text-right"
                step="1"
                min="0"
              />
            </b-container>
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
            <!-- IP User -->
            <b-form-group
              id="containerIP_xclient"
              class="form-group"
              description="Solo si usa un servidor X (Use su IP Local)."
            >
              <label id="labelFancyIP_xclient" class="mt-1"
                >Ruta por Defecto</label
              >
              <input
                id="inputIP_xclient"
                type="text"
                class="form-control text-right"
                placeholder="0   .   0   .   0   .   0"
              />
            </b-form-group>

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
            <!-- IP User -->
            <b-container id="containerHostTemplate" class="form-group">
              <img
                type="image"
                id="inputInfoHostTemplate"
                title="Información"
                src="@/assets/img/host.png"
                width="25px"
                height="30px"
                class="m-0 d-inline mr-3"
              />
              <label id="labelHostTemplate" class="p-0">Número de Host:</label>
              <input
                id="inputHostTemplate"
                type="text"
                class="form-control text-right"
              />
            </b-container>
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
    <b-modal
      id="modal-done"
      no-close-on-esc
      hide-footer
      no-close-on-backdrop
      hide-header-close
      centered
      title="RESULTADO"
    >
      <b-container
        id="containerDone"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormDone">
          <b-form id="formularioFancyDone" class="p-0">
            <b-row id="containerDone" class="m-0 pt-3">
              <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h6 class="p-0 m-0 text-primary" id="H1FancyDone">
                  {{ alertText }}
                </h6>
              </b-col>
            </b-row>
            <b-row id="containerDone" class="m-0 pt-3">
              <b-col
                class="text-center col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <span v-if="in_process">
                  <b-spinner variant="primary" label="Loading..."></b-spinner>
                </span>
              </b-col>
            </b-row>
          </b-form>
        </b-container>

        <b-row id="containerFancyButtonFormDone" class="m-0 p-0 text-right">
          <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0"
            ><b-button
              :disabled="in_process"
              variant="dark"
              squared
              type="button"
              id="buttonModal"
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
          <!-- Type Traffic-->
          <!-- Sheduler Host -->
          <b-container id="containerSelectorraffic" class="form-group">
            <label id="labelSelectorTraffic" class="mt-2"
              >Seleccione el tipo de Tráfico</label
            >
            <select
              id="optionSelectorTraffic"
              class="form-control form-control"
            >
              <option value="TCP" selected>TCP</option>
              <option value="UDP">UDP</option>
            </select>
          </b-container>
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
          <b-row
            id="parameterTime"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="m-0 p-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio name="option-radios" value="time" id="radioTime">
                Tiempo de Emulación:
              </b-form-radio>
            </b-col>

            <b-col class="m-0 col-sm-7 col-md-7 col-lg-7 col-xl-7"
              ><b-input
                type="number"
                id="inputTime"
                step="0.1"
                min="1"
                max="100000"
                class=""
            /></b-col>
          </b-row>

          <!-- Fila Longitud de Paquete -->
          <b-row
            id="parameterLong"
            class="m-0 mt-1 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-checkbox
                id="checkboxLong"
                name="checkbox-Long"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Longitud del Paquete
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputLong"
                step="0.1"
                min="1"
                max="100000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-long"
                  value="long"
                  class="p-2 ml-5 pl-1"
                  id="radio-kbytes-long"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-long"
                  value="long"
                  class="p-2 ml-5 mt-0"
                  id="radio-mbytes-long"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Intervalo de Tiempo -->
          <b-row
            id="parameterRange"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-checkbox
                id="checkboxRange"
                name="checkbox-Range"
                value="accepted"
                unchecked-value="not_accepted"
                >Intervalo de Tiempo</b-form-checkbox
              >
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-input
                type="number"
                id="inputRange"
                step="0.01"
                min="1"
                max="1000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <label
                  id="labelFancyHost d-inline text-center"
                  class="ml-5 mt-2"
                >
                  Segundos
                </label>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Bit Rate -->
          <b-row
            id="parameterRate"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-checkbox
                id="checkboxRate"
                name="checkbox-Rate"
                value="accepted"
                unchecked-value="not_accepted"
                >Ancho de Banda del Destino
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputRate"
                step="0.01"
                min="1"
                max="1000000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-rate"
                  value="rateKb"
                  class="p-2 ml-5 pl-1"
                  id="radioKBitRate"
                >
                  Kb/s
                </b-form-radio>
                <b-form-radio
                  name="option-radios-rate"
                  value="rateMb"
                  class="p-2 ml-4 pl-2 mt-0"
                  id="radioMBitRae"
                >
                  Mb/s
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Window -->
          <b-row
            id="parameterW"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-checkbox
                id="checkboxW"
                name="checkbox-W"
                value="accepted"
                unchecked-value="not_accepted"
                >Tamaño de la Ventana Deslizante
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputW"
                step="0.01"
                min="1"
                max="1000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-w"
                  value="wkB"
                  class="p-2 ml-5 pl-1"
                  id="radioKBytesW"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-w"
                  value="wMb"
                  class="p-2 ml-5 pl-1"
                  id="radioMBytesW"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- FILA CANTIDAD DE PAQUETES -->
          <b-row
            id="parameterPacket"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio
                name="option-radios"
                value="packet"
                id="radioPacket"
              >
                Cantidad de Paquetes
              </b-form-radio>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputPacket"
                step="0.001"
                min="1"
                max="1000000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-packet"
                  value="wkB"
                  class="p-2 ml-5 pl-1"
                  id="radioKBytesPacket"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-packet"
                  value="wMb"
                  class="p-2 ml-5 pl-1"
                  id="radioMBytesPacket"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- FILA CANTIDAD DE PAQUETES -->
          <b-row
            id="parameterBlock"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio name="option-radios" value="packet" id="radioBlock">
                Número de Bloques
              </b-form-radio>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputBlock"
                step="0.001"
                min="1"
                max="1000000"
                class="ml-3 d-inline"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-Block"
                  value="wkB"
                  class="p-2 ml-5 pl-1"
                  id="radioKBytesBlock"
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-Block"
                  value="wMb"
                  class="p-2 ml-5 pl-1"
                  id="radioMBytesBlock"
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <b-row class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
              >
                Seleccione el modo de operación
              </label>
            </b-col>
          </b-row>

          <b-row class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-form-radio
                name="option-radios-type"
                value="global"
                id="radioGlobal"
                v-model="trafficModeSelected"
              >
                Global
              </b-form-radio>
            </b-col>

            <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-form-radio
                name="option-radios-type"
                value="specific"
                id="radioSpecific"
                v-model="trafficModeSelected"
              >
                Especifico
              </b-form-radio>
            </b-col>
            <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-form-radio
                name="option-radios-type"
                value="xtreme"
                id="radioXtreme"
                v-model="trafficModeSelected"
              >
                Extremo a extremo
              </b-form-radio>
            </b-col>
          </b-row>

          <b-row
            class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
            v-if="selHostG"
          >
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
              >
                Seleccione el modo de Distribución
              </label>
            </b-col>
          </b-row>

          <b-row
            class="ml-4 col-sm-10 col-md-10 col-lg-10 col-xl-10"
            v-if="selHostG"
          >
            <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio
                name="option-radios-distr"
                value="Uno a Uno"
                id="radioUnoaUno"
                class="pl-5"
              >
                Todos a Todos
              </b-form-radio>
            </b-col>

            <b-col class="ml-4 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio
                name="option-radios-distr"
                value="Todos a Todos"
                id="radioTodosaTodos"
                class="pl-5 ml-5"
              >
                Uno a Uno
              </b-form-radio>
            </b-col>
          </b-row>

          <b-row
            class="m-3 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            v-if="specifficTrafficMode"
          >
            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label id="parameterHostA">Desde el Host:</label>
            </b-col>

            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <b-form-select
                id="optionSelectorHostA"
                v-model="selected"
                :options="tagHost"
              ></b-form-select>
            </b-col>
            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label id="parameterHostB">Al Host:</label>
            </b-col>

            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <b-form-select
                id="optionSelectorHostB"
                v-model="selected"
                :options="tagHost"
              ></b-form-select>
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
      <b-container
        id="containerGrafic"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-form
          id="formularioFancyGrafic"
          class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        >
          <b-row class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7">
              <!-- Container Grafico -->
              <b-row id="containerCanvaGraphic">
                <canvas id="graphic" v-if="canvasAnswerServer"></canvas>
                <canvas id="graphic2" v-if="canvasAnswerClient"></canvas>
                <canvas id="graphic3" v-if="canvasAnswerTot"></canvas>
              </b-row>
            </b-col>

            <b-col
              id="containerFancyInfoGraphicTCPClient"
              class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
            >
              <b-row
                id="continerSelectClientServer"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <label id="labelSelectServerClientTCP"> Seleccione: </label>
                </b-col>

                <b-col class="col-sm-4 col-md-4 col-lg-5 col-xl-5">
                  <b-select id="optionSelectServerClientTCP" size="sm">
                    <option id="serverTCP">Servidor</option>
                    <option id="clientTCP">Cliente</option>
                  </b-select>
                </b-col>

                <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
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
              <b-row
                id="continerParameterTcpClient"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="clientAnswerTcp"
              >
                <b-row
                  id="continerLabelMeter"
                  class="m-0 mt-2 mb-3 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col
                    ><label
                      id="labelparameterMeter"
                      class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                    >
                      MÉTRICAS DE DESEMPEÑO
                    </label></b-col
                  >
                </b-row>

                <!-- Modo de Operación -->
                <b-row
                  id="continerParameter_modo_op"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op">Modo Operación:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_tcp_client"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
                <!-- Protocolo -->
                <b-row
                  id="continerParameter_protocol"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol">Protocolo:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_client"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_duration"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration">Duración:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_size_block"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block">Tamaño Bloque:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_bloque"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_tcp_mss"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_tcp_mss">TCP MSS:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_tcp_mss"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_snd_buffer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer">Buffer Envió:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_rcv_buffer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_total_bytes"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes">Total Bytes:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_tbytes"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_bit"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_sndcwnd"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_sndcwnd"
                      >Prom SND CWND:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_sndcwnd"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_rtt"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_rtt">Prom RTT:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_rtt"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_rtx"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_rtx">Prom R-Tx:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_rtx"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_rttvar"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_rttvar">Prom RTTVAR:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_rttvar"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_pmtu"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_pmtu">Prom PMTU:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_pmtu"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- TCP SERVER -->
              <b-row
                id="continerParameterTcpServer"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="serverAnswerTcp"
              >
                <b-row
                  id="continerLabelMeter"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col
                    class="m-0 mt-2 mb-3 col-sm-12 col-md-12 col-lg-12 col-xl-12"
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
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <!-- Modo Operación -->
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op_Server"
                      >Modo Operación:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_tcp_Server"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_protocol_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol_Server"
                      >Protocolo:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_Server"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_duration_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration_Server">Duración:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration_Server"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_size_block_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block_Server"
                      >Tamaño Bloque:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_bloque_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque_Server">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_tcp_mss_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_tcp_mss_Server">TCP MSS:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_tcp_mss_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_snd_buffer_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer_Server"
                      >Buffer Envió:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_rcv_buffer_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer_Server"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_total_bytes_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes_Server"
                      >Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_tbytes_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes_Server"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_bit_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit_Server"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit_Server"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- UDP CLIENTE -->
              <b-row
                id="continerParameterUDPClient"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="clientAnswerUdp"
              >
                <!-- Name Meter -->
                <b-row
                  id="continerLabelMeterUDPClient"
                  class="m-0 mt-2 mb-3 col-sm-12 col-md-12 col-lg-12 col-xl-12"
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
                <!-- Modo Op -->
                <b-row
                  id="continerParameter_modo_op_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op_UDPClient"
                      >Modo Operación:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_UDPClient"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Protocolo -->
                <b-row
                  id="continerParameter_protocol_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol_UDPClient"
                      >Protocolo:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_UDPClient"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
                <!-- Duración -->
                <b-row
                  id="continerParameter_duration_Server"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration_UDPClient"
                      >Duración:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration_UDPClient"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
                <!-- Tamaño Bloque -->
                <b-row
                  id="continerParameter_size_block_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block_UDPClient"
                      >Tamaño Bloque:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Bloques -->
                <b-row
                  id="continerParameter_bloque_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque_UDPClient">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Buffer envio -->
                <b-row
                  id="continerParameter_snd_buffer_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer_UDPClient"
                      >Buffer Envió:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Buffer recepción -->
                <b-row
                  id="continerParameter_rcv_buffer_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer_UDPClient"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Total Bytes -->
                <b-row
                  id="continerParameter_total_bytes_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes_UDPClient"
                      >Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Total Bytes -->
                <b-row
                  id="continerParameter_prom_tbytes_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes_UDPClient"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Prom Bit por Seg -->
                <b-row
                  id="continerParameter_prom_bit_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit_UDPClient"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Jitter -->
                <b-row
                  id="continerParameter_jitter_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_jitter_UDPClient"
                      >Jitter (ms):</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_jitter_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <!-- Paquetes -->
                <b-row
                  id="continerParameter_packet_UDPClient"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_packet_UDPClient"
                      >Paquetes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_packet_UDPClient"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- UDP SERVER -->
              <b-row
                id="continerParameterUDPServer"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="serverAnswerUdp"
              >
                <b-row
                  id="continerLabelMeterUDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col
                    class="m-0 mt-2 mb-2 col-sm-12 col-md-12 col-lg-12 col-xl-12"
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
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op_UDPServer"
                      >Modo Operación:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_UDPServer"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_protocol_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol_UDPServer"
                      >Protocolo:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_UDPServer"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_duration_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration_UDPServer"
                      >Duración:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration_UDPServer"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_size_block_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block_UDPServer"
                      >Tamaño Bloque:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_bloque_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque_UDPServer">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_snd_buffer_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer_UDPServer"
                      >Buffer Envió:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_rcv_buffer_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer_UDPServer"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_total_bytes_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes_UDPServer"
                      >Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_tbytes_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes_UDPServer"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_bit_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit_UDPServer"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_jitter_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_jitter_UDPServer"
                      >Jitter (ms):</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_jitter_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_packet_UDPServer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_packet_UDPServer"
                      >Paquetes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_packet_UDPServer"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- TCP TOTAL -->
              <b-row
                id="continerParameterTcpTotal"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="totalAnswerTcp"
              >
                <b-row
                  id="continerLabelMeterTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col
                    class="m-0 mt-2 mb-3 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    ><label
                      id="labelparameterMeterTotal"
                      class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                    >
                      MÉTRICAS DE DESEMPEÑO
                    </label></b-col
                  >
                </b-row>

                <b-row
                  id="continerParameter_modo_op_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <!-- Modo Operación -->
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op_ServerTotal"
                      >Modo Operación:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_tcp_Total"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_protocol_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol_Total">Protocolo:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_Total"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_duration_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration_Total">Duración:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration_Total"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_size_block_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block_Total"
                      >Tamaño Bloque:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_bloque_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque_Total">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_tcp_mss_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_tcp_mss_Total">TCP MSS:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_tcp_mss_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_snd_buffer_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer_Total"
                      >Buffer Envió:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_rcv_buffer_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer_Total"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_total_bytes_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes_Total"
                      >Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_tbytes_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes_Total"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_bit_Total"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit_Total"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit_Total"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- UDP TOTAL -->
              <b-row
                id="continerParameterUDPTotal"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="totalAnswerUdp"
              >
                <b-row
                  id="continerLabelMeterUDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col
                    class="m-0 mt-2 mb-2 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    ><label
                      id="labelparameterMeterUDPTotal"
                      class="pl-4 m-0 ml-2 text-center font-weight-bold text-uppercase"
                    >
                      MÉTRICAS DE DESEMPEÑO
                    </label></b-col
                  >
                </b-row>

                <b-row
                  id="continerParameter_modo_op_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_modo_op_UDPTotal"
                      >Modo Operación:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_modo_op_UDPTotal"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_protocol_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_protocol_UDPTotal"
                      >Protocolo:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_protocol_tcp_UDPTotal"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_duration_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_duration_UDPTotal"
                      >Duración:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_duration_UDPTotal"
                      name="fname"
                      size="sm"
                      class=""
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_size_block_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_size_block_UDPTotal"
                      >Tamaño Bloque:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class="ml-0"
                      id="input_size_block_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_bloque_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_bloque_UDPTotal">Bloques:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      id="input_bloque_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_snd_buffer_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer_UDPTotal"
                      >Buffer Envió:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_snd_buffer_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_rcv_buffer_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_rcv_buffer_UDPTotal"
                      >Buffer Recepción:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_rcv_buffer_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_total_bytes_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_total_bytes_UDPTotal"
                      >Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_total_bytes_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_tbytes_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_tbytes_UDPTotal"
                      >Prom Total Bytes:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_tbytes_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_prom_bit_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_prom_bit_UDPTotal"
                      >Prom Bit por Seg:</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_prom_bit_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_jitter_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_jitter_UDPTotal"
                      >Jitter (ms):</label
                    >
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_jitter_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>

                <b-row
                  id="continerParameter_packet_UDPTotal"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_packet_UDPTotal">Paquetes:</label>
                  </b-col>
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <b-input
                      type="text"
                      class=""
                      id="input_packet_UDPTotal"
                      name="fname"
                      size="sm"
                      disabled
                      readonly
                    />
                  </b-col>
                </b-row>
              </b-row>
            </b-col>
          </b-row>
        </b-form>
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
              @click="closeModal('graffic')"
              >Cerrar</b-button
            >
          </b-col>
        </b-row>
      </template>
    </b-modal>

    <!-- Modal Analizador Grafico de Especifico -->
    <b-modal
      id="modal-specific"
      centered
      title="Analizador de Tráfico Especifico"
      cancel-title="Cancelar"
      scrollable
      size="xl"
    >
      <b-container
        id="containerTrafficHost"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-form
          inline
          id="formularioFancyTrafficHost"
          class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        >
          <b-row
            id="divLabelTrafficHostSpecific"
            class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col
              id="divLabelHostGeneral"
              class="text-center m-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"
            >
              <h6 class="info_host" id="idenHost">HOST:</h6>
            </b-col>
            <b-col
              id="divLabelHostSpecific"
              class="text-left m-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"
            >
              <h6 class="info_hostS" id="idenHost">x</h6>
            </b-col>
            <b-col
              id="divlabelLink"
              class="m-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"
            >
              <label id="labelLink"> Enlace a: </label>
            </b-col>
            <b-col
              id="divLabelHostGeneral"
              class="text-left m-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"
            >
              <select id="optionLink" data-default="opL1"></select>
            </b-col>
            <b-col
              id="divlabelSelectServerClientHSpecific"
              class="m-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"
            >
              <label id="labelSelectServerClientHSpecific"> Desde: </label>
            </b-col>
            <b-col
              id="divbotonSelectClientServerHSpecific"
              class="text-left m-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"
            >
              <select
                id="optionSelectServerClientHSpecific"
                data-default="opLSC"
              >
                <option id="serverHSpecific" selected="selected">
                  Servidor
                </option>
                <option id="clientHSpecific">Cliente</option>
              </select>
            </b-col>
            <b-col
              id="divLabelHostGeneral"
              class="m-0 mt-1 text-right col-sm-1 col-md-1 col-lg-2 col-xl-2"
            >
              <b-button
                squared
                variant="dark"
                id="buttonModal"
                class="m-0"
                value="Cancelar"
                size="sm"
                >Generar</b-button
              >
            </b-col>
          </b-row>

          <b-row
            id="divLabelGeneralSpecific"
            class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col
              id="divLabelGeneral"
              class="text-center m-0 mt-2 mb-2 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <h5 class="info_host" id="idenHost">Datos Generales</h5>
            </b-col>
          </b-row>

          <!-- CONTAINER TCP -->
          <b-container
            id="specificTCP"
            class="d-none m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <!-- Local Host - Remote -->
            <b-row
              id="divTableHostRemoteLocal"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Host Local:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="local_host"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Host Remoto:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="remote_host"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Port Host - Remote -->
            <b-row
              id="divTablePortRemoteLocal"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Puerto Local:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="local_port"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Puerto Remoto:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="remote_port"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Omitido - Protocolo -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Omitido:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="omit"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Protocolo:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="protocolHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Buffer Envió - Recepción -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Buffer Envío:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="buff_snd"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Buffer Recepción:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="buff_rcv"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Bytes TX - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Bytes Especificos de Tx:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="bytesHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Ventana Deslizante:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="windowHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Duración - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Duración:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="timeHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Bloques:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="blockHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- TCP MSS - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">TCP MSS:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="tcp_mssHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Tamaño Bloque:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="blocksizeHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>
          </b-container>

          <!-- CONTAINER UDP -->
          <b-container
            id="specificTCP"
            class="d-none m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <!-- Local Host - Remote -->
            <b-row
              id="divTableHostRemoteLocal"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Host Local:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="local_host"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Host Remoto:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="remote_host"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Port Host - Remote -->
            <b-row
              id="divTablePortRemoteLocal"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Puerto Local:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="local_port"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Puerto Remoto:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="remote_port"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Omitido - Protocolo -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Omitido:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="omit"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Protocolo:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="protocolHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Buffer Envió - Recepción -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Buffer Envío:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="buff_snd"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Buffer Recepción:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="buff_rcv"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Bytes TX - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Bytes Especificos de Tx:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="bytesHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Ventana Deslizante:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="windowHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- Duración - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Duración:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="timeHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Bloques:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="blockHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>

            <!-- TCP MSS - windows HS -->
            <b-row
              id="divTableHostGeneral"
              class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            >
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">TCP MSS:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="tcp_mssHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <label class="m-1">Tamaño Bloque:</label>
              </b-col>
              <b-col class="m-0 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                <b-input
                  type="text"
                  id="blocksizeHG"
                  size="sm"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                  disabled
                  readonly
                />
              </b-col>
            </b-row>
          </b-container>

          <!-- Tabla Dinamica Specific TCP-->
          <b-container
            class="d-none m-0 mt-2 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            id="containerHostSpecific"
          >
            <table class="table" id="tableHostSpecific">
              <thead id="th_tableHostHG">
                <tr class="trTableHS">
                  <th id="generalHostSpecific">Time I</th>
                  <th id="generalHostSpecific">Time F</th>
                  <th id="generalHostSpecific">Bytes</th>
                  <th id="generalHostSpecific">BitRate</th>
                  <th id="generalHostSpecific">Re Tx</th>
                  <th id="generalHostSpecific">CWND</th>
                  <th id="generalHostSpecific">RTT</th>
                  <th id="generalHostSpecific">RTTVAR</th>
                  <th id="generalHostSpecific">PMTU</th>
                </tr>
              </thead>
              <tbody id="tb_tableHostHG"></tbody>
            </table>
          </b-container>

          <!-- Tabla Dinamica Specific UDP-->
          <b-container
            class="d-none m-0 mt-2 col-sm-12 col-md-12 col-lg-12 col-xl-12"
            id="containerHostSpecific"
          >
            <table class="table" id="tableHostSpecific">
              <thead id="th_tableHostHG">
                <tr class="trTableHS">
                  <th id="generalHostSpecific">Time I</th>
                  <th id="generalHostSpecific">Time F</th>
                  <th id="generalHostSpecific">Bytes</th>
                  <th id="generalHostSpecific">BitRate</th>
                  <th id="generalHostSpecific">Re Tx</th>
                  <th id="generalHostSpecific">CWND</th>
                  <th id="generalHostSpecific">RTT</th>
                  <th id="generalHostSpecific">RTTVAR</th>
                  <th id="generalHostSpecific">PMTU</th>
                </tr>
              </thead>
              <tbody id="tb_tableHostHG"></tbody>
            </table>
          </b-container>
        </b-form>
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
              @click="closeModal('specific')"
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
      in_process: false,

      trafficModeSelected: "",

      selected: null,
      //Variable Generador Trafico
      selHostS: false,
      selHostG: true,

      //Variable Generador Grafico
      canvasAnswerServer: false,
      canvasAnswerClient: false,
      canvasAnswerTot: false,
      totalAnswerTcp: false,
      totalAnswerUdp: false,
      serverAnswerTcp: false,
      serverAnswerUdp: false,
      clientAnswerTcp: false,
      clientAnswerUdp: false,

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

      listHost: [],
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

      protocolTrafficActual: "",

      // Variables control del Analizador Gráfico
      // Variables eje Y Cliente
      datosYNumBytes: [],
      datosYBitsnPerSecond: [],
      datosYSndCwnd: [],
      datosYRetransmits: [],
      datosYRtt: [],
      datosYRttVar: [],
      datosYPmtu: [],

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
      if (open == "grafic") {
        return this.$bvModal.show("modal-grafic");
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
      this.llenarListaHost();
      var ipClient = $("#inputIP_xclient").val();
      this.netWork["items"] = this.elements;
      this.netWork["IpClient"] = ipClient;

      console.log("Network Info: " + JSON.stringify(this.netWork));
      var json = JSON.stringify(this.netWork);
      const path = "http://10.55.6.188:5000/";
      this.closeModal("play");
      this.in_process = true;
      this.alertText = "Creando la Red...";
      this.openModal("done");
      axios
        .post(path, this.netWork)
        .then((response) => {
          var h1 = $("#text-done");
          var validator = Object.keys(response.data).includes("red");

          if (validator == true) {
            this.in_process = false;
            this.alertText = "Red Creada Exitosamente.";
            this.openModal("done");
          } else {
            this.alertText = "Error en la Creación de la Red.";
            this.in_process = false;
            this.openModal("done");
            // this.in_process = false;

            // this.openModal("done");
          }
        })
        .catch((error) => {
          this.in_process = false;
          this.alertText = "Imposible Crear la Red.";
          this.openModal("done");
          console.log(error);
        });
      console.log("lista: " + JSON.stringify(this.listHost));
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
      this.protocolTrafficActual = "TCP";
      var timeEmulation = $("#inputTime").val();
      var lengthPackage = $("#inputLong").val();
      var trafficDir = {};
      trafficDir["TCP"] = "true";
      trafficDir["n"] = String(lengthPackage) + "M";
      //trafficDir["t"] = String(timeEmulation);
      trafficDir["global"] = "true";
      this.closeModal("traffic");
      this.alertText = "Procesando Tráfico...";
      this.in_process = true;
      this.openModal("done");
      const path = "http://10.55.6.188:5000/";
      axios
        .post(path, trafficDir)
        .then((response) => {
          // Mensaje Confirmación de Tráfico
          var data = response.data;
          if (isObjEmpity(data)) {
            this.alertText = "Error en la Ejecución.";
            this.in_process = false;
            this.openModal("done");
          } else {
            // Gestión de Datos del Servidor
            var trafficValues = {};
            var trafficValuesServer = {};
            var counter = 0;
            var interval = 0;
            var protocol = "";
            var time_e = 0;
            var blocks = "";
            var tcpMssDefault = "";
            var blkSize = "";
            var sockBufSize = "";
            var rcvBufActual = "";
            var sndBufActual = "";

            var totalBytesTx = 0;
            var bitsPerSecond = 0;
            var promTotalBytesTx = 0;
            var promBitsPerSecond = 0;
            var totalBytesTxServer = 0;
            var bitsPerSecondServer = 0;
            var promTotalBytesTxServer = 0;
            var promBitsPerSecondServer = 0;
            var sndCwnd = 0;
            var promSndCwnd = 0;
            var rtt = 0;
            var promRtt = 0;
            var retransmits = 0;
            var promRetransmits = 0;
            var rttVar = 0;
            var promRttVar = 0;
            var pmtu = 0;
            var promPmtu = 0;
            var contador = 0;
            var auxList = ["null"];
            var intervalLabels = 0;
            var numTotalTempos = [];
            //Obtención de Datos para Analizador Gráfico}
            //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

            if (this.protocol == "TCP") {
              for (var k in data) {
                var sp = String(k).split("_");

                //Si el valor despues del separador es una h la respuesta proviene del Host-Cliente
                if (String(sp[1]).charAt(0) == "h") {
                  numTotalTempos.push(
                    parseInt(Object.keys(data[k]["speciffic"]).length)
                  );
                  // En este ciclo se suman todos los datos correspondientes
                  for (var t in data[k]["speciffic"]) {
                    totalBytesTx =
                      totalBytesTx +
                      parseInt(data[k]["speciffic"][t]["n_bytes"]);
                    bitsPerSecond =
                      bitsPerSecond +
                      parseInt(data[k]["speciffic"][t]["bits_per_second"]);
                    sndCwnd =
                      sndCwnd + parseInt(data[k]["speciffic"][t]["snd_cwnd"]);
                    rtt = rtt + parseInt(data[k]["speciffic"][t]["rtt"]);
                    retransmits =
                      retransmits +
                      parseInt(data[k]["speciffic"][t]["retransmits"]);
                    rttVar =
                      rttVar + parseInt(data[k]["speciffic"][t]["rttvar"]);
                    pmtu = pmtu + parseInt(data[k]["speciffic"][t]["pmtu"]);
                    counter = counter + 1;
                    var llave = String(t);

                    //Valores Numero de Bytes
                    if (
                      Object.keys(trafficValues).includes(
                        String(t) + "_num_bytes"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_num_bytes"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["n_bytes"]
                      );
                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_num_bytes"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_num_bytes"] = parseInt(
                        data[k]["speciffic"][t]["n_bytes"]
                      );
                    }

                    //Valores Bits por Segundo
                    if (
                      Object.keys(trafficValues).includes(
                        String(t) + "_bits_per_second"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_bits_per_second"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["bits_per_second"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_bits_per_second"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_bits_per_second"] = parseInt(
                        data[k]["speciffic"][t]["bits_per_second"]
                      );
                    }

                    //Valores SND CWND
                    if (
                      Object.keys(trafficValues).includes(
                        String(t) + "_snd_cwnd"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_snd_cwnd"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["snd_cwnd"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_snd_cwnd"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_snd_cwnd"] = parseInt(
                        data[k]["speciffic"][t]["snd_cwnd"]
                      );
                    }

                    //Valores Retransmitidos
                    if (
                      Object.keys(trafficValues).includes(
                        String(t) + "_retransmits"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_retransmits"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["retransmits"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_retransmits"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_retransmits"] = parseInt(
                        data[k]["speciffic"][t]["retransmits"]
                      );
                    }
                    //Valores RTT
                    if (
                      Object.keys(trafficValues).includes(String(t) + "_rtt")
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_rtt"]
                      );
                      var valorSumar = parseInt(data[k]["speciffic"][t]["rtt"]);

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_rtt"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_rtt"] = parseInt(
                        data[k]["speciffic"][t]["rtt"]
                      );
                    }

                    //Valores RTTVar
                    if (
                      Object.keys(trafficValues).includes(String(t) + "_rttvar")
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_rttvar"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["rttvar"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_rttvar"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_rttvar"] = parseInt(
                        data[k]["speciffic"][t]["rttvar"]
                      );
                    }

                    //Valores PMTU
                    if (
                      Object.keys(trafficValues).includes(String(t) + "_pmtu")
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValues[llave + "_pmtu"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["pmtu"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValues[llave + "_pmtu"] = totalNumBytes;
                    } else {
                      trafficValues[llave + "_pmtu"] = parseInt(
                        data[k]["speciffic"][t]["pmtu"]
                      );
                    }
                  }
                  protocol = String(data[k]["general"]["protocol"]);
                  time_e = data[k]["general"]["duration"];
                  blocks = String(data[k]["general"]["blocks"]);
                  tcpMssDefault = String(data[k]["general"]["tcp_mss_default"]);
                  blkSize = String(data[k]["general"]["blksize"]);
                  sockBufSize = String(data[k]["general"]["sock_bufsize"]);
                  rcvBufActual = String(data[k]["general"]["rcvbuf_actual"]);
                  sndBufActual = String(data[k]["general"]["sndbuf_actual"]);

                  //Promedio de Bytes Transmitidos en la Emulacion del Tráfico Cliente°
                  promTotalBytesTx = totalBytesTx / counter;
                  promBitsPerSecond = bitsPerSecond / counter;
                  promSndCwnd = sndCwnd / counter;
                  promRtt = rtt / counter;
                  promRetransmits = retransmits / counter;
                  promRttVar = rttVar / counter;
                  promPmtu = pmtu / counter;

                  for (var i = 0; i < numTotalTempos.length; i++) {
                    if (numTotalTempos[i] < numTotalTempos[i + 1]) {
                      intervalLabels = numTotalTempos[i + 1];
                    } else {
                      intervalLabels = numTotalTempos[i];
                    }
                  }

                  for (var o in trafficValues) {
                    for (var q = 0; q < intervalLabels; q++) {
                      if (String(o) == "t_" + String(q) + "_num_bytes") {
                        this.datosYNumBytes[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_bits_per_second") {
                        this.datosYBitsnPerSecond[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_snd_cwnd") {
                        this.datosYSndCwnd[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_retransmits") {
                        this.datosYRetransmits[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_rtt") {
                        this.datosYRtt[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_rttvar") {
                        this.datosYRttVar[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_pmtu") {
                        this.datosYPmtu[q] = trafficValues[o];
                      }
                    }
                  }
                }
                //Si el valor despues del separador es un Número la respuesta proviene del Host-Servidor
                else {
                }
              }
            }
          }
        })
        .catch((error) => {
          this.in_process = false;
          this.alertText = "Imposible Crear el Tráfico.";
          this.openModal("done");
          console.log(error);
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
      } else if (idElement == "c") {
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
        this.closeModal("controller");
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

      // Creador Topología Single - 1 Conmutador Conectado a N Host
      if (this.topologyType == "single") {
        if (this.numHost < 2) {
          this.closeModal("single");
          this.alertText = "No es Posible Realizar la Red";
          this.openModal("done");
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
      // Creador Topología Linear - N Conmutador Conectado a N Host cada uno
      else if (this.topologyType == "linear") {
        if (this.numHost < 2) {
          this.alertText = "No es Posible Realizar la Red";
          this.openModal("done");
        } else {
          // Host
          for (var r = 0; r < this.numHost; r++) {
            var pY = 3 * 60;
            posX[r] = (r + 1) * 240;
            image = "img/host.png";
            var obj = {
              value: tagHost[r],
              rX: posX[r],
              rY: pY + 80,
            };

            var objSw = {
              value: tagSwitchOF[r],
              rX: posX[r] + 90,
              rY: pY + 80,
            };

            netInfo.push(obj);
            h[r] = obj;

            netInfo.push(objSw);
            s[r] = objSw;
          }

          var pCX1 = netInfo.length * 68;

          // Inserta Switch y Host de la Topolgía Linear
          for (var a = 0; a < h.length; a++) {
            insertElement(
              h[a].rX,
              h[a].rY,
              "../static/img/host.png",
              "h" + (tagHost.length + 1),
              numHost,
              topologyType
            );
            insertElement(
              s[a].rX,
              s[a].rY,
              "../static/img/openflow_switch.png",
              "s" + (tagSwitchOF.length + 1),
              numHost,
              topologyType
            );
          }

          var port0Delete = "s" + (tagSwitchOF.length - numHost + 1);
          var port2Delete = "s" + tagSwitchOF.length;
          canvas.forEachObject(function (obj) {
            if (obj.elementContainer == port0Delete && obj.id == "eth0") {
              canvas.remove(obj);
              canvas.remove(obj.line);
            }
            if (obj.elementContainer == port2Delete && obj.id == "eth2") {
              canvas.remove(obj);
              canvas.remove(obj.line);
            }
          });

          //Inserta el Controller de la Topología Linear
          insertElement(
            pCX1,
            pCY,
            "../static/img/controller.png",
            "c" + +(tagController.length + 1),
            numHost,
            topologyType
          );
        }
        // Esta sección Crea Los Links y Las Asociaciones al Controlador de la Red Linear
        var id0 = [];
        var id1 = [];
        var posX1 = [];
        var posY1 = [];
        var posX2 = [];
        var posY2 = [];
        var objHost = [];
        var objSwitch = [];
        var objController = [];

        // **--** Esta seccion busca y enlaza los eth0 de los Host y los eth1 de los Switchs ** -- ** -- ** -- ** -- **--** --** -- **
        for (var i = tagHost.length - numHost; i <= tagHost.length; i++) {
          id0.push("h" + (i + 1));
          canvas.forEachObject(function (obj) {
            if (obj.elementContainer && obj.elementContainer == id0[i - 1]) {
              if (obj.id == "eth0") {
                posX2.push(obj.connection[0].x2);
                posY2.push(obj.connection[0].y2);
                objHost.push(obj);
              }
            }
          });
        }

        for (
          var i = tagSwitchOF.length - numHost;
          i <= tagSwitchOF.length;
          i++
        ) {
          id1.push("s" + (i + 1));
          canvas.forEachObject(function (obj) {
            if (obj.elementContainer && obj.elementContainer == id1[i - 1]) {
              if (obj.id == "eth1") {
                posX1.push(obj.connection[0].x2);
                posY1.push(obj.connection[0].y2);
                objSwitch.push(obj);
              }
            }
          });
        }

        for (var s = 0; s < posX1.length; s++) {
          var link = makeLink([posX1[s], posY1[s], posX2[s], posY2[s]], "link");
          canvas.add(link);
          canvas.sendToBack(link);

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
        // **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- **

        id0 = [];
        id1 = [];
        posX1 = [];
        posY1 = [];
        posX2 = [];
        posY2 = [];
        objHost = [];
        objSwitch = [];
        objController = [];
        var objSwitchAux = [];

        // **--** Esta seccion busca y enlaza los eth0 de los Switchs y los eth2 de los Switchs ** -- ** -- ** -- ** -- **--** --** -- **
        for (
          var i = tagSwitchOF.length - numHost;
          i <= tagSwitchOF.length;
          i++
        ) {
          id0.push("s" + (i + 1));
          canvas.forEachObject(function (obj) {
            if (obj.elementContainer && obj.elementContainer == id0[i - 1]) {
              if (obj.id == "eth0") {
                posX2.push(obj.connection[0].x2);
                posY2.push(obj.connection[0].y2);
                obj.position = "terminal";
                objSwitchAux.push(obj);
              }
            }
          });
        }
        console.log(objSwitchAux[0].id);

        for (
          var i = tagSwitchOF.length - numHost;
          i <= tagSwitchOF.length;
          i++
        ) {
          id1.push("s" + (i + 1));
          canvas.forEachObject(function (obj) {
            if (obj.elementContainer && obj.elementContainer == id1[i - 1]) {
              if (obj.id == "eth2") {
                posX1.push(obj.connection[0].x2);
                posY1.push(obj.connection[0].y2);
                obj.position = "initial";
                objSwitch.push(obj);
              }
            }
          });
        }

        for (var s = 0; s < posX1.length; s++) {
          var link = makeLink([posX2[s], posY2[s], posX1[s], posY1[s]], "link");
          canvas.add(link);
          canvas.sendToBack(link);

          objSwitch[s].state = "connected";
          objSwitchAux[s].state = "connected";
          objSwitch[s].connection.push(link);
          objSwitchAux[s].connection.push(link);

          objSwitch[s].link = link;
          objSwitchAux[s].link = link;

          //Emparejamiento
          link.connectionLink =
            objSwitch[s].elementContainer +
            "," +
            objSwitchAux[s].elementContainer;
          link.intfName1 =
            objSwitch[s].elementContainer + "-" + objSwitch[s].id;
          link.intfName2 =
            objSwitchAux[s].elementContainer + "-" + objSwitchAux[s].id;
        }
        // **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- ** **--** --** -- ** -- ** -- **
      }
    },

    llenarListaHost() {
      if (this.tagHost.length > 0) {
        for (var h = 0; h < this.tagHost.length; h++) {
          var temporal = {};
          temporal["id"] = String(this.tagHost[h]);
          this.listHost.push(temporal);
        }
      }
    },
    openInfoModal(id){
      
    }
  },

  computed: {
    obtenerHerramienta() {
      this.actualTool = this.herramienta;
      return this.actualTool;
    },

    specifficTrafficMode() {
      if (this.trafficModeSelected == "global") {
        console.log("g");
        return this.selHostS;
      }
      if (this.trafficModeSelected == "xtreme") {
        console.log("x");
        return this.selHostS;
      }
      if (this.trafficModeSelected == "specific") {
        console.log("s");
        return !this.selHostS;
      }
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

/* Canvas Graffic */
#graphic,
#graphic2,
#graphic3 {
  width: 578px;
  height: 396px;
  margin: 2px;
}

#graphic {
  background-color: rgba(0, 255, 42, 0.582);
}
#graphic2 {
  background-color: aqua;
}
#graphic3 {
  background-color: rgb(0, 89, 255);
}
</style>
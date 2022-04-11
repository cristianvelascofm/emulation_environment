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
            >Simple</b-dropdown-item
          >
          <b-dropdown-item class="p-1">Anillo</b-dropdown-item>
          <b-dropdown-item class="p-1"  @click="openModal('linear')">Lineal</b-dropdown-item>
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
        <b-dropdown-item href="#" id="odl" class="p-1"
          >Controlador Onos</b-dropdown-item
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
        @click="newDocument()"
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
        @click="saveCanvas()"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="pegar-direct-access"
        @click="loadCanvas()"
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
        :disabled="play_activator"
        @click="stopEmulation"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="check-direct-access"
        :disabled = 'play_activator'
        @click="openModal('traffic')"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        :disabled="play_activator"
        id="graf-direct-access"
      ></button>
      <button
        type="button"
        class="btn btn-outline-primary m-md-2"
        id="diagram-direct-access"
        :disabled="traffic_activator"
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
      <b-col class="col-sm-2 col-md-2 col-lg-1 col-xl-1  m-0" id="bar-lat">
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
      <b-col class="col-sm-10 col-md-10 col-lg-11 col-xl-11 p-0 m-0">
        <b-container class="col-12 p-0" id="container-canvas">
          <canvas id="fcanvas" height="5000" width="5000" ref="canvas"></canvas>
        </b-container>
      </b-col>
    </b-row>

    <!-- Modales de  creacion elementos individuales de red -->
    <!-- Modal Controller -->
    <b-modal
      id="modal-controller"
      centered
      title="Controlador"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      hide-footer
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('controller')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Controlador</h5>
          </b-col>
        </b-row>
      </template>

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
                v-model="typeController"
              >
                <option value="Por Defecto">
                  Por Defecto
                </option>
                <option value="OpenFlow">
                  OpenFlow Reference Implementation
                </option>
                <option value="NOX">NOX</option>
                <option value="OVS">OVS</option>
                <option value="OpenDayLigth">OpenDayLigth</option>
              </select>
            </b-container>

            <!-- IP Controller -->
            <b-container id="container-Ip" class="form-group">
              <label for="labelType" class="mt-1">IP</label>
              <b-input
                id="inputFancyIpController"
                type="text"
                class="form-control text-right"
                v-model="ipController"
                placeholder="0   .   0   .   0   .   0"
                :state='stateIpController'
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
                id="inputFancyPortController"
                type="number"
                class="form-control text-right"
                step="1"
                min="1"
                v-model="portController"
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
                v-model="protocolController"
              >
                <option value="Ninguno">Ninguno</option>
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
      no-close-on-esc
      no-close-on-backdrop
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
                v-model="typeSwitch"
              >
                <option value="Ninguno">Ninguno</option>
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
                  value="stp"
                  unchecked-value="not_stp"
                  v-model="stpSwitch"
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
                  v-model="stpPriority"
                />
              </b-col>
            </b-row>

            <!-- IP Switch -->
            <b-container id="containerIPSwitch" class="form-group">
              <label id="labelFancyIPSwitch" for="labelType" class="mt-1"
                >IP</label
              >
              <b-input
                id="labelFancyIPSwitch"
                type="text"
                class="form-control text-right"
                placeholder="0   .   0   .   0   .   0"
                v-model="ipSwitch"
                :state='stateIpSwitch'
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
                v-model="portSwitch"
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
                v-model="protocolSwitch"
              >
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
                v-model="dataPath"
              >
                <option value="Ninguno" selected>Ninguno</option>
                <option value="Kernel">kernel</option>
                <option value="User">user</option>
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
                v-model= 'dataPathId'
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
                v-model= 'dataPathOpt'
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
                v-model="failMode"
              >
                <option value="Ninguno">Ninguno</option>
                <option value="Secure">secure</option>
                <option value="Standalone">standalone</option>
              </select>
            </b-container>
             <!-- Reconnect  Switch -->
            <b-container id="containerFailMode" class="form-group">
              <label for="labelType" id="labelReconnectModeSwitch" class="mt-1"
                >Tiempo de Reconexión (ms)</label
              >
              <input
                id="inputFancyReconnectSwitch"
                type="number"
                class="form-control text-right"
                v-model="reconnectSwitch"
              />
            </b-container>

            <b-row id="containerCheckBoxOne" class="m-0 pt-3">
              <b-col class="pl-5 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                ><b-form-checkbox
                  id="InBandFancySwitch"
                  name="checkbox-InBand"
                  value="inband"
                  unchecked-value="not_accepted"
                  v-model="inBand"
                >
                  InBand
                </b-form-checkbox>
                <b-form-checkbox
                  id="InNameSpaceFancySwitch"
                  name="checkbox-inNameSpace"
                  value="innamespace"
                  unchecked-value="not_accepted"
                  v-model="inNameSpace"
                >
                  In NameSpace
                </b-form-checkbox>
              </b-col>
              <b-col class="pl-5 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <b-form-checkbox
                  id="BatchFancySwitch"
                  name="checkbox-batch"
                  value="batch"
                  unchecked-value="not_accepted"
                  v-model="batch"
                >
                  Batch
                </b-form-checkbox>
                <b-form-checkbox
                  id="VerboseFancySwitch"
                  name="checkbox-verbose"
                  value="verbose"
                  unchecked-value="not_accepted"
                  v-model="verbose"
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
    <b-modal
      id="modal-host"
      hide-footer
      centered
      title="Host"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('host')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Host</h5>
          </b-col>
        </b-row>
      </template>

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
              <b-input
                id="inputFancyIPHost"
                type="text"
                class="form-control text-right"
                :state = 'stateIpHost'
                placeholder="0   .   0   .   0   .   0"
                v-model="ipHost"
                
              />
            </b-container>

            <!-- Sheduler Host -->
            <b-container id="containerShedulerHost" class="form-group">
              <label id="labelSchedulerFancyHost" class="mt-2">Scheduler</label>
              <select
                id="optionShedulerFancyHost"
                class="form-control form-control"
                v-model="sheduler"
              >
                <option value="Ninguno">Ninguno</option>
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
                v-model="limitCpu"
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
                v-model="coreCpu"
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
    <b-modal
      id="modal-port"
      hide-footer
      centered
      title="Puerto"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('port')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Puerto</h5>
          </b-col>
        </b-row>
      </template>
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
                  v-model="ipPort"
                  
                />
            <b-row id="containerPort" class="m-0 pt-3 text-rigth">
              <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <b-button size="sm" variant="success" v-if="linkActive" @click="openModal('link')">Enlace</b-button>
              </b-col>
            </b-row>
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
              @click="addPort()"
              >Ok</b-button
            >
            <b-button
              squared
              variant="dark"
              id="CancelarButtonFancyPort"
              class="m-2"
              value="Cancelar"
              @click="closeModal('port')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Link -->
    <b-modal
      id="modal-link"
      hide-footer
      centered
      title="Enlace"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('link')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Enlace</h5>
          </b-col>
        </b-row>
      </template>

      <b-container
        id="containerInsertLink"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormLink">
          <b-form id="formularioFancyLink" class="p-0">
            <!-- Ancho de Banda -->
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
                  v-model="bwLink"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >Mb/s</label
                ></b-col
              >
            </b-row>
            <!-- Delay -->
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
                  v-model="delayLink"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >ms</label
                ></b-col
              >
            </b-row>
            <!-- Jitter -->
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
                  v-model="jitterLink"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >ms</label
                ></b-col
              >
            </b-row>
            <!-- Maxima Queue -->
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
                  v-model="queueLink"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyUnityBandWidthLink" class="pt-2"
                  >Paquetes</label
                ></b-col
              >
            </b-row>
            <!-- Pérdidas -->
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
                  v-model="lossLink"
              /></b-col>

              <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-2"
                ><label id="labelFancyLossLink" class="pt-2"
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
              @click="closeModal('link')"
              >Cancelar</b-button
            ></b-col
          >
        </b-row>
      </b-container>

      <!-- <p class="my-4">Vertically centered modal!</p> -->
    </b-modal>

    <!-- Modal Etiqueta -->
    <b-modal
      id="modal-label"
      hide-footer
      centered
      title="Etiqueta"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('label')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Etiqueta</h5>
          </b-col>
        </b-row>
      </template>

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
    <b-modal
      id="modal-IpUser"
      hide-footer
      centered
      title="Configurción IP"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('ipUser')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Configuaración IP</h5>
          </b-col>
        </b-row>
      </template>

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
                v-model="ipClient"
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
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('topology')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Parámetros de la Red</h5>
          </b-col>
        </b-row>
      </template>

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
                type="number"
                class="form-control text-right"
                v-model="numHostTopology"
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
      no-close-on-backdrop
      hide-footer
      hide-header-close
      centered
      title="Resultado"
    >

      <template #modal-header>
        <!-- Emulate built in modal header close button action -->
        <b-row class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
            <b-icon v-if="errorServer" icon="question-circle-fill" aria-label="dark"></b-icon>
            <b-button
              size="sm"
              pill
              class="ml-2"
              variant="outline-ligth"
              v-if="errorServer"
              @click="openInfoModal('error')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Resultado</h5>
          </b-col>
        </b-row>
      </template>

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
            <b-row id="containerSpiner" class="m-0 pt-3">
              <b-col
                class="text-center col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <span v-if="in_process">
                  <b-spinner variant="primary" label="Loading..."></b-spinner>
                </span>
              </b-col>
            </b-row>
            <b-row id="containerErrorServer" class="m-0 pt-3">
              <b-col
                class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <span  v-if="errorServer">
                  <small class="text-danger"  >{{ serverText }}</small>
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

    <!-- Modales Configuracion y Analisis del Trafico de la Red -->
    <!-- Modal Generador de Tráfico -->
    <b-modal
      id="modal-traffic"
      cancel-title="Cancelar"
      scrollable
      centered
      title="Genetador de Tráfico"
      size="lg"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('traffic')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Generador de Tráfico</h5>
          </b-col>
        </b-row>
      </template>

      <b-container
        id="containerForm_traffic"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-form id="formulario_traffic" class="p-0">
          <!-- Type Traffic-->

          <!-- Sheduler Host -->
          <b-container id="containerSelectorraffic" class="form-group">
            <label id="labelSelectorTraffic" class="mt-2 font-weight-bold text-uppercase"
              >Seleccione el tipo de Tráfico:</label
            >
            <select
              id="optionSelectorTraffic"
              class="form-control form-control"
              v-model= "typeTrafic"
            >
              <option value="TCP" >Protocolo de Control de Transmisión (TCP)</option>
              <option value="UDP">Protocolo de Datagrama de Usuario (UDP)</option>
            </select>
          </b-container>
          <b-row class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
              >
                Seleccione el modo de operación:
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
                Específico
              </b-form-radio>
            </b-col>
            <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-form-radio
                name="option-radios-type"
                value="xtreme"
                id="radioXtreme"
                v-model="trafficModeSelected"
              >
                Extremo a Extremo
              </b-form-radio>
            </b-col>
          </b-row>

          <b-row
            class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
            v-if="traficDistribution"
          >
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
              >
                Seleccione el modo de Distribución:
              </label>
            </b-col>
          </b-row>

          <b-row
            class="ml-4 col-sm-10 col-md-10 col-lg-10 col-xl-10"
            v-if="traficDistribution"
          >
            <b-col class="col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio
                name="option-radios-distr"
                value="one"
                id="radioUnoaUno"
                class="pl-5"
                v-model="distributionMode"
              >
                Uno a Uno
              </b-form-radio>
            </b-col>

            <b-col class="ml-4 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio
                name="option-radios-distr"
                value="all"
                id="radioTodosaTodos"
                class="pl-5 ml-5"
                v-model="distributionMode"
              >
                Todos a Todos
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
                v-model="selectedClientHost"
                :options="tagHost"
              ></b-form-select>
            </b-col>
            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <label id="parameterHostB">Al Host:</label>
            </b-col>

            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <b-form-select
                id="optionSelectorHostB"
                v-model="selectedServertHost"
                :options="tagHost"
              ></b-form-select>
            </b-col>
          </b-row>
          <!-- Label -->
          <b-row>
            <b-col class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
              ><label
                id="parameterTraffic"
                class="p-0 mt-3 mp-3 ml-0 font-weight-bold text-uppercase"
                >Establezca los parametros de tráfico:
              </label>
            </b-col>
          </b-row>

          <!-- FILA PARAMETRO DE TIEMPO -->
          <b-row
            id="parameterTime"
            class="m-0 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="m-0 p-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio name="option-radios" value="t" id="radioTime" v-model="radioTime">
                Tiempo de Emulación:
              </b-form-radio>
            </b-col>

            <b-col class="m-0 col-sm-7 col-md-7 col-lg-7 col-xl-7"
              ><b-input
                type="number"
                id="inputTime"
                step="1"
                min="1"
                max="100000"
                class=""
                :state = 'stateTime'
                :disabled = 'optionCheckerTime'
                v-model="textTime"
            /></b-col>
          </b-row>

          <!-- FILA Número de Bytes -->
          <b-row
            id="parameterPacket"
            class="m-0 mt-1 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-radio name="option-radios" value="n" id="radioPacket" v-model="radioPacket">
                Número de Bytes
              </b-form-radio>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputPacket"
                step="1"
                min="1"
                max="90000000"
                :state = 'statePacket'
                class="ml-3 d-inline"
                :disabled = 'optionCheckerPacket'
                v-model="textPacket"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-packet"
                  value="K"
                  class="p-2 ml-5 pl-1"
                  id="radioKBytesPacket"
                  v-model= "radioKPacket"
                  :disabled = 'optionCheckerPacket'
                >
                  KB
                </b-form-radio>
                <b-form-radio
                  name="option-radios-packet"
                  value="M"
                  class="p-2 ml-5 pl-1"
                  id="radioMBytesPacket"
                  v-model="radioKPacket"
                  :disabled = 'optionCheckerPacket'
                >
                  MB
                </b-form-radio>
              </b-row>
            </b-col>
          </b-row>

          <!-- Fila Tamaño del Paquete -->
          <b-row
            id="parameterLong"
            class="m-0 mt-1 p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          >
            <b-col class="p-0 m-0 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <b-form-checkbox
                id="checkboxLong"
                name="checkbox-Long"
                value="l"
                unchecked-value="not_accepted"
                v-model="valueLong"
              >
                Tamaño del Paquete
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputLong"
                step="1"
                min="1"
                max="1024"
                :state = 'stateLong'
                class="ml-3 d-inline"
                :disabled = 'optionCheckerLong'
                v-model="textLong"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-long"
                  value="K"
                  class="p-2 ml-5 pl-1"
                  id="radio-kbytes-long"
                  v-model="radioLong"
                  :disabled = 'optionCheckerLong'
                >
                  KB
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
                value="w"
                unchecked-value="not_accepted"
                v-model="valueWindow"
                >Tamaño de la Ventana Deslizante
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputW"
                step="1"
                min="1"
                max="30000"
                :state = 'stateWindow'
                class="ml-3 d-inline"
                :disabled= 'optionCheckerWindow'
                v-model="textWindow"
              />
            </b-col>

            <b-col class="col-sm-2 col-md-2 col-lg-2 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-w"
                  value="K"
                  class="p-2 ml-5 pl-1"
                  id="radioKBytesW"
                  v-model="radioWindow"
                  :disabled = 'optionCheckerWindow'
                >
                  KB
                </b-form-radio>
               
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
                value="b"
                unchecked-value="not_accepted"
                v-model="valueBw"
                >Ancho de Banda
              </b-form-checkbox>
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4"
              ><b-input
                type="number"
                id="inputRate"
                step="1"
                min="1"
                max="90000000"
                :state = 'stateBw'
                class="ml-3 d-inline"
                :disabled = 'optionCheckerBw'
                v-model="textBw"
              />
            </b-col>

            <b-col class="col-sm-3 col-md-3 col-lg-3 col-xl-3">
              <b-row>
                <b-form-radio
                  name="option-radios-rate"
                  value="K"
                  class="p-2 ml-5 pl-1"
                  id="radioKBitRate"
                  v-model = 'radioBw'
                  :disabled = 'optionCheckerBw'
                >
                  Kb/s
                </b-form-radio>
                <b-form-radio
                  name="option-radios-rate"
                  value="M"
                  class="p-2 ml-4 pl-2 mt-0"
                  id="radioMBitRate"
                  v-model = 'radioBw'
                  :disabled = 'optionCheckerBw'
                >
                  Mb/s
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
                value="i"
                unchecked-value="not_accepted"
                v-model="valueInterval"
                >Intérvalo de Muestreo</b-form-checkbox
              >
            </b-col>

            <b-col class="p-0 m-0 col-sm-4 col-md-4 col-lg-4 col-xl-4">
              <b-input
                type="number"
                id="inputRange"
                step="1"
                min="1"
                max="90000000"
                :state = 'stateInterval'
                class="ml-3 d-inline"
                :disabled = "optionCheckerInterval"
                v-model="textInterval"
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
              :disabled = 'stateOKTrafic'
              @submit="validatorDataTrafic"
              @click="validatorDataTrafic"
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

    <!-- Modal Analizador Gráfico de Tráfico -->
    <b-modal
      id="modal-grafic"
      centered
      title="Analizador Grafico de Red"
      cancel-title="Cancelar"
      scrollable
      size="xl"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('graffic')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Analizador Grafico de Red</h5>
          </b-col>
        </b-row>
      </template>

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
                <line-chart
                  id="graphic2"
                  v-if="canvasGraphic"
                  :width="578"
                  :height="396"
                  :chart-data="chartdata"
                  :options="options"
                />
              </b-row>
            </b-col>

            <b-col
              id="containerFancyInfoGraphicTCPClient"
              class="col-sm-5 col-md-5 col-lg-5 col-xl-5"
            >
              <!-- Graficador Canvas -->
              <b-row
                id="continerSelectClientServer"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
              >
                <b-col class="col-sm-4 col-md-4 col-lg-4 col-xl-4">
                  <label id="labelSelectServerClientTCP"> Seleccione: </label>
                </b-col>

                <b-col class="col-sm-8 col-md-8 col-lg-8 col-xl-8">
                  <b-select
                    v-model="trafficGraphic"
                    @change="changeGraphic()"
                    id="optionSelectServerClientTCP"
                    size="sm"
                  >
                    <option id="clientTCP">General</option>
                    <option id="clientTCP">Cliente</option>
                    <option id="serverTCP">Servidor</option>
                  </b-select>
                </b-col>
              </b-row>
              <!-- Métricas de Desempeño Generales-->
              <b-row
                id="continerParameterTcpClient"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="metrics"
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
                  <!-- Modo de Operación -->
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
                      v-model="modeOpTcp"
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
                      v-model="protocolTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Duración -->
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
                      v-model="timeTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Tamaño del Bloque -->
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
                      v-model="sizeBlockTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Bloques -->
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
                      v-model="blockTcp"
                    />
                  </b-col>
                </b-row>
                <!-- TCP MSS -->
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
                      v-model="tcpMssTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Buffer de Envio -->
                <b-row
                  id="continerParameter_snd_buffer"
                  class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                >
                  <b-col class="m-0 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <label id="labelparameter_snd_buffer">Buffer Envio:</label>
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
                      v-model="sndBufferTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Buffer de Recepción -->
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
                      v-model="rcvBufferTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Total Bytes -->
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
                      v-model="totalBytesTcp"
                    />
                  </b-col>
                </b-row>
              </b-row>


              <!-- TCP -->
              <b-row
                id="continerParameterTcpClient"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="activeTcp"
              >
                <!-- Valores Promedio del Trafico Generado -->
                <!-- Promedio Total de Bytes -->
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
                      v-model="promTotalBytesTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Promedio De Bits por Segundo -->
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
                      v-model="promBitsPerSecondTcp"
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- Cliente TCP -->
              <b-row
                id="continerParameterTcpServer"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="clientAnswerTcp"
              >
               <!-- Promedio de SND CWND -->
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
                      v-model="promSndCwndTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Promedio RTT -->
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
                      v-model="promRttTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Promedio de Retransmitidos Transmision -->
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
                      v-model="promRetransmitsTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Promedio RTTVAR -->
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
                      v-model="promRttVarTcp"
                    />
                  </b-col>
                </b-row>
                <!-- Promedio PMTU -->
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
                      v-model="promPmtuTcp"
                    />
                  </b-col>
                </b-row>
              </b-row>

              <!-- UDP  -->
              <b-row
                id="continerParameterUDPClient"
                class="m-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                v-if="activeUdp"
              >
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
                      v-model="promTotalBytesUdp"
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
                      v-model="promBitPerSecondUdp"
                      
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
                      v-model="jitterUdp"
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
                      v-model="packetsUdp"
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
              @click="closeModal('grafic')"
              >Cerrar</b-button
            >
          </b-col>
        </b-row>
      </template>
    </b-modal>

    <!-- Modal Info Trafico de Especifico de cada Host -->
    <b-modal
      id="modal-specific"
      centered
      title="Analizador de Tráfico Especifico"
      cancel-title="Cancelar"
      scrollable
      size="xl"
      header-bg-variant="light"
      header-text-variant="dark"
      no-close-on-esc
      no-close-on-backdrop
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
              @click="openInfoModal('specific')"
            >
              Info
            </b-button>
          </b-col>
          <b-col class="col-sm-7 col-md-7 col-lg-7 col-xl-7 text-right">
            <h5>Analizador de Tráfico Especifico</h5>
          </b-col>
        </b-row>
      </template>

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
              <h6 class="info_hostS" id="idenHost">{{identTagHost}}</h6>
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

    <!-- Modal Info -->
    <b-modal
      id="modal-info"
      hide-footer
      size="lg"
      centered
      title="Información"
      cancel-title="Cancelar"
      header-bg-variant="light"
      header-text-variant="info"
      no-close-on-esc
      no-close-on-backdrop
    >
      <b-container
        id="containerInsertHost"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <b-container id="containerFormInfo">
          <b-form id="formularioFancyHost" class="p-0">
            <b-table
              sticky-header
              no-border-collapse
              head-variant="Dark"
              responsive="true"
              striped
              hover
              :items="infoModal"
            ></b-table>
          </b-form>
        </b-container>
      </b-container>

      <b-row id="containerFancyButtonFormLink" class="m-0 p-0 text-right">
        <b-col class="p-0 col-sm-12 col-md-12 col-lg-12 col-xl-12"
          ><b-button
            variant="dark"
            squared
            type="button"
            id="GuardarButtonFancyLink"
            value="Guardar"
            class="m-2 mr-5"
            @click="closeModal('info')"
            >Ok</b-button
          >
        </b-col>
      </b-row>
      
    </b-modal>
  </div>
</template>
   

<script>
import axios from "axios";
// import Chart from 'chart.js';
import LineChart from "./LineChart.js";

export default {
  components: { LineChart },
  data() {
    // Importamos JQuery
    const $ = require("jquery");
    // Lo declaramos globalmente
    window.$ = $;

    return {
      // Dirección del Servidor de Mininet - IMPORTANTE DEFINIR!!!
      path: "http://10.55.6.188:5000/",
      //Variable id Herramienta seleccionada (barra lateral izquierda - Barra de Elementos de Red)
      herramienta: "cursor",

      // Variables para la activacion de botones, funciones y alertas
      in_process: false,
      play_activator: true,
      traffic_activator: true,

      // Modelos para Los inputs Modales Elements
      // Modal Host
      ipHost: '',
      stateIpHost: null,
      sheduler: 'Ninguno',
      limitCpu: '',
      coreCpu: '',
      // Modal Switch
      typeSwitch: 'Ninguno',
      stpSwitch: '',
      stpPriority: '',
      ipSwitch: '',
      stateIpSwitch: null,
      portSwitch: '',
      protocolSwitch: 'OpenFlow 1.2',
      dataPath: 'Ninguno',
      dataPathId: '',
      dataPathOpt:'',
      failMode: 'Ninguno',
      reconnectSwitch: '',
      inBand: '',
      inNameSpace: '',
      batch: '',
      verbose: '',
      // Modal Controller
      typeController: 'Por Defecto',
      ipController: '',
      stateIpController: null,
      portController: '',
      protocolController: 'Ninguno',
      // Modal Puerto
      ipPort : '',
      stateIpPort: null,
      // Modal Link
      bwLink: '',
      delayLink: '',
      jitterLink: '',
      queueLink: '',
      lossLink: '',
      // Modal Ip Usuario
      ipClient: '',
      // Modal Template Topology
      numHostTopology: '',
      // Modal Generador de Tráfico
      //Variables para las opciones de Tráfico
      typeTrafic : 'TCP',
      trafficModeSelected: "",
      distributionMode: '',
      checkerLong: false,
      valueLong: '',
      radioLong: '',
      checkerWindow: false,
      valueWindow: '',
      radioWindow: '',
      checkerBw: false,
      valueBw: '',
      radioBw: '',
      radioTime: '',
      checkerTime: false,
      radioPacket: '',
      radioKPacket: '',
      checkerPacket: false,
      checkerInterval: false,
      valueInterval: '',
      //Variable Generador Trafico
      selHostS: false,
      selHostG: false,
      // Variables Host Trafico Modo Especifico
      selectedClientHost: '',
      selectedServertHost: '',
      // Variables Datos Trafico
      textTime: '',
      stateTime: null,
      textPacket: '',
      statePacket: null,
      textLong: '',
      stateLong: null,
      textWindow: '',
      stateWindow: null,
      textBw: '',
      stateBw: null,
      textInterval: '',
      stateInterval: null,
      stateOKTrafic: true,
      //  Modal Graphic
      trafficGraphic: "General",
      canvasGraphic: false,
      totalAnswerTcp: false,
      totalAnswerUdp: false,
      serverAnswerTcp: false,
      serverAnswerUdp: false,
      clientAnswerTcp: false,
      clientAnswerUdp: false,
      activeTcp: false,
      activeUdp: false,
      metrics: false,
      // Variables TCP Cliente
      // Valores Generales del Trafico 
      modeOpTcp: '',
      protocolTcp: '',
      timeTcp: '',
      sizeBlockTcp: '',
      blockTcp: '',
      tcpMssTcp: '',
      sndBufferTcp: '',
      rcvBufferTcp: '',
      totalBytesTcp: '',
      // Valores Promedio del Trafico Tcp 
      promTotalBytesTcp: '',
      promBitsPerSecondTcp: '',
      promSndCwndTcp: '',
      promRttTcp: '',
      promRetransmitsTcp: '',
      promRttVarTcp: '',
      promPmtuTcp: '',
      // Variables TCP Servidor
      promTotalBytesUdp: '',
      promBitPerSecondUdp: '',
      jitterUdp: '',
      packetsUdp: '',

      // Variable para el Modal del Enlace Link
      linkActive: false,

      // Variables auxiliares para los datos del Trafico
      // TCP
      totalBytesTcpclient: '',
      promTotalBytesTcpClient: '',
      promBitsPerSecondTcpClient: '',
      totalBytesTcpServer: '',
      promTotalBytesTcpServer: '',
      promBitsPerSecondTcpServer: '',
      

      infoModal: [],
      //Canvas
      canvas: "",
      flag: true,
      //Varibales posición Fabric
      x0: "",
      y0: "",

      // Variables asociadas a funciones en el Canvas
      copiedObject: null,
      copiedObjects: new Array(),
      cutted: false,
      stateFabric: [],
      mods: 0,
      savedFabric: null,

      //Variables Insertar elemento
      imgElement: "",
      tagElement: "",
      
      //Eventos de uso en el canvas
      insertOP: false,
      imgUrl: "",
      selected: null,
      tool: "cursor",
      action: null,
      countAsociate: 0,
      tag: "",
      img: "",
      objectActiveLinkInitial: null,
      objectActiveLinkFinal: null,
      identTagHost: "",

      //Variables para la Logica de los elementos en la Red simulada
      tagHost: [],
      tagSwitch: [],
      tagController: [],
      netInfo: [],
      link: [],

      // Esta variable no sirve
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
      labelsGraphic: [],
      datosYNumBytes: [],
      datosYBitsnPerSecond: [],
      datosYSndCwnd: [],
      datosYRetransmits: [],
      datosYRtt: [],
      datosYRttVar: [],
      datosYPmtu: [],
      datosYNumBytesServer: [],
      datosYBitsPerSecondServer: [],

      //Variable para los Modales de Informacion
      alertText: "",
      errorServer: false,
      serverText: "",

      //datos CHart
      chartdata: null,
      options: null,
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
        stopContextMenu: true, // <--  prevent context menu from showing
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
        this.action = 'insert';
        this.x0 = pointer.x; //get initial starting point of x
        this.y0 = pointer.y; //get initial starting point of y
        switch (this.herramienta) {
          case "cursor":
            var objectActive = this.canvas.getActiveObject();
            
            if (objectActive != null) {

              console.log(objectActive);
              // Se reestablece el Libre movimiento del Elemento  Activo (Si por alguna otra instancia ha sido bloqueado)
              objectActive && objectActive.set({
                lockMovementX: false,
                lockMovementY: false,
                lockScalingX: false,
                lockScalingY: false,
                lockUniScaling: false,
                lockRotation: false,
              });
              if(options.button === 3){
                if(objectActive.id.charAt(0) == 'h'){
                  this.openModal('specific');
                }
              }
              //Si el Elemento Activo es una Asociación o Link aumenta su Grosor
              if (objectActive.id.charAt(0) == "l" || objectActive.id.charAt(0) == "n") {
                objActive && objActive.set({
                    strokeWidth: 4,
                });
                this.canvas.renderAll();
              };
              
              // Todos Los Elementos de Red Tendrán Una opacidad de 100% y el Elementro Activo una Opacidad del 70%
              this.canvas.forEachObject(function (obj) {
                obj && obj.set({
                    opacity: 1,
                });
              });

              objectActive.set({
                opacity: 0.7,
              });          
            }else{
              this.canvas.forEachObject(function (obj) {
                if (obj.id.charAt(0) == "l" || obj.id.charAt(0) == "n") {
                  obj.set({
                    strokeWidth: 2,
                  });
                };
                obj.set({
                  opacity: 1,
                });
                // this.canvas.renderAll();
                });
            };
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
            // Reestablece las variables asociadas al Modal Host
            this.ipHost = '';
            this.sheduler = 'Ninguno';
            this.limitCpu = '';
            this.coreCpu = '';
            this.openModal("host");
            this.herramienta = "cursor";
            break;
          case "port":
            this.openModal('port');
            this.herramienta = 'cursor';
            break;
          case "link":
            var active = this.canvas.getActiveObject()
            // Se bloquea el movimiento del Elemento de Red
            if(active != null){
              active && active.set({
                lockMovementX: true,
                lockMovementY: true,
                lockScalingX: true,
                lockScalingY: true,
                lockUniScaling: true,
                lockRotation: true,
              });
            };
            // Si es una Interfaz de Red (Puerto)
            if (active != null && active.id.charAt(0) == "e") {
                
                active.set({
                    opacity: 0.7,
                });
                // Evaluacion de los casos de Enlace en un puerto
                // Si la interfaz de red es la primera seleccion del enlace a realizar y su estado es NO conectado, el elemento final del enlace tambien debe ser nulo
                if(this.objectActiveLinkInitial == null && active.state != 'connected' && this.objectActiveLinkFinal == null){
                  this.objectActiveLinkInitial = active;
                  var coordenadasEnlace = [];
                  coordenadasEnlace[0] = this.objectActiveLinkInitial.connection[0].x2;
                  coordenadasEnlace[1] = this.objectActiveLinkInitial.connection[0].y2;
                  coordenadasEnlace[2] = this.objectActiveLinkInitial.connection[0].x2;
                  coordenadasEnlace[3] = this.objectActiveLinkInitial.connection[0].y2;
                  var link = this.makeLink(coordenadasEnlace,'link');
                  if(this.objectActiveLinkInitial.elementContainer.charAt(0) == 's' || this.objectActiveLinkInitial.elementContainer.charAt(0) == 'h'){
                    this.objectActiveLinkInitial.position = 'initial';
                  };
                  this.selected = link;
                  this.canvas.add(link);
                }
                // Si la interfaz de red es la segunda seleccion del enlace a realizar y su estado es NO conectado, el elemento inicial del enlace NO debe ser nulo
                else if(this.objectActiveLinkInitial != null && active.state != 'connected' && this.objectActiveLinkFinal == null){
                  this.objectActiveLinkFinal = active;
                  // Si el Enlace es de un Switch a Otro Sitch Diferente
                  if (this.objectActiveLinkFinal.elementContainer.charAt(0) == 's' && this.objectActiveLinkInitial.elementContainer.charAt(0) == 's' && this.objectActiveLinkInitial.elementContainer != this.objectActiveLinkFinal.elementContainer) {
                    this.selected.set({
                      x2: this.objectActiveLinkFinal.connection[0].x2,
                      y2: this.objectActiveLinkFinal.connection[0].y2,
                    });
                    this.objectActiveLinkInitial.state = "connected";
                    this.objectActiveLinkFinal.state = "connected";
                    this.objectActiveLinkInitial.line = this.selected;
                    this.objectActiveLinkFinal.line = this.selected;
                    this.objectActiveLinkInitial.connection.push(this.selected);
                    this.objectActiveLinkFinal.connection.push(this.selected);
                    this.objectActiveLinkFinal.position = "terminal";
                    this.canvas.sendToBack(this.selected);
                    this.selected.connectionLink= this.objectActiveLinkInitial.elementContainer + ',' + this.objectActiveLinkInitial.elementContainer;
                    this.selected.intfName1 = this.objectActiveLinkInitial.elementContainer + '-' + this.objectActiveLinkInitial.id;
                    this.selected.intfName2 = this.objectActiveLinkFinal.elementContainer + '-' + this.objectActiveLinkFinal.id;
                    this.herramienta = 'cursor';
                    this.selected = null;
                    this.objectActiveLinkInitial = null;
                    this.objectActiveLinkFinal = null;
                  } 
                  // Si el Enlace es de un Switch a un Host
                  else if(this.objectActiveLinkFinal.elementContainer.charAt(0) == 's' && this.objectActiveLinkInitial.elementContainer.charAt(0) == 'h'){
                    this.selected.set({
                      x2: this.objectActiveLinkFinal.connection[0].x2,
                      y2: this.objectActiveLinkFinal.connection[0].y2,
                    });
                    this.objectActiveLinkInitial.state = "connected";
                    this.objectActiveLinkFinal.state = "connected";
                    this.objectActiveLinkInitial.line = this.selected;
                    this.objectActiveLinkFinal.line = this.selected;
                    this.objectActiveLinkInitial.connection.push(this.selected);
                    this.objectActiveLinkFinal.connection.push(this.selected);
                    this.objectActiveLinkFinal.position = 'terminal';
                    this.canvas.sendToBack(this.selected);
                    this.selected.connectionLink= this.objectActiveLinkInitial.elementContainer + ',' + this.objectActiveLinkInitial.elementContainer;
                    this.selected.intfName1 = this.objectActiveLinkInitial.elementContainer + '-' + this.objectActiveLinkInitial.id;
                    this.selected.intfName2 = this.objectActiveLinkFinal.elementContainer + '-' + this.objectActiveLinkFinal.id;
                    this.herramienta = 'cursor';
                    this.selected = null;
                    this.objectActiveLinkInitial = null;
                    this.objectActiveLinkFinal = null;
                  }
                  // Si el Enlace es de un Host a un Switch
                  else if(this.objectActiveLinkFinal.elementContainer.charAt(0) == 'h' && this.objectActiveLinkInitial.elementContainer.charAt(0) == 's'){
                    this.selected.set({
                      x2: this.objectActiveLinkFinal.connection[0].x2,
                      y2: this.objectActiveLinkFinal.connection[0].y2,
                    });
                    this.objectActiveLinkInitial.state = "connected";
                    this.objectActiveLinkFinal.state = "connected";
                    this.objectActiveLinkInitial.line = this.selected;
                    this.objectActiveLinkFinal.line = this.selected;
                    this.objectActiveLinkInitial.connection.push(this.selected);
                    this.objectActiveLinkFinal.connection.push(this.selected);
                    this.objectActiveLinkFinal.position = 'terminal';
                    this.selected.connectionLink= this.objectActiveLinkInitial.elementContainer + ',' + this.objectActiveLinkInitial.elementContainer;
                    this.selected.intfName1 = this.objectActiveLinkInitial.elementContainer + '-' + this.objectActiveLinkInitial.id;
                    this.selected.intfName2 = this.objectActiveLinkFinal.elementContainer + '-' + this.objectActiveLinkFinal.id;
                    this.canvas.sendToBack(this.selected);
                    this.herramienta = 'cursor';
                    this.selected = null;
                    this.objectActiveLinkInitial = null;
                    this.objectActiveLinkFinal = null;
                  }
                }
                // Si el Enlace Se hace al mismo Elemento de Red, este enlance se eliminará.
                else if (this.objectActiveLinkInitial.elementContainer == this.objectActiveLinkFinal.elementContainer) {
                  this.canvas.remove(this.selected);
                  this.herramienta = 'cursor';
                  this.selected = null;
                  this.objectActiveLinkInitial = null;
                  this.objectActiveLinkFinal = null;
                };
                // this.herramienta = 'cursor';
                // this.selected = null;
                // this.objectActiveLinkInitial = null;
                // this.objectActiveLinkFinal = null;
            }else if (active != null && active.id.charAt(0) == "c"){
              console.log(active)
              active.set({
                opacity: 0.7,
              })

              if(this.objectActiveLinkInitial == null && active.state != 'connected' && this.objectActiveLinkFinal == null){
                this.objectActiveLinkInitial = active
                var coordenadasEnlace = [];
                coordenadasEnlace[0] = this.objectActiveLinkInitial.left+30;
                coordenadasEnlace[1] = this.objectActiveLinkInitial.top+30;
                coordenadasEnlace[2] = this.objectActiveLinkInitial.left+30;
                coordenadasEnlace[3] = this.objectActiveLinkInitial.top+30;
                var link = this.makeLink(coordenadasEnlace,'controller');
                this.selected = link
                this.canvas.add(link)
              }
              else if(this.objectActiveLinkInitial != null && active.state != 'connected' && this.objectActiveLinkFinal == null){
                this.objectActiveLinkFinal = active
                 this.selected.set({
                      x2: this.objectActiveLinkFinal.connection[0].x2,
                      y2: this.objectActiveLinkFinal.connection[0].y2,
                    });
                    
                    this.objectActiveLinkInitial.state = "connected";
                    this.objectActiveLinkFinal.state = "connected";
                    this.objectActiveLinkInitial.line = this.selected;
                    this.objectActiveLinkFinal.line = this.selected;
                    this.objectActiveLinkInitial.connection.push(this.selected);
                    this.objectActiveLinkFinal.connection.push(this.selected);
                    this.objectActiveLinkFinal.position = "terminal";
                    this.herramienta = 'cursor'
                    // this.canvas.sendToBack(this.selected);
                    // this.selected.connectionLink= this.objectActiveLinkInitial.elementContainer + ',' + this.objectActiveLinkInitial.elementContainer;
                    // this.selected.intfName1 = this.objectActiveLinkInitial.elementContainer + '-' + this.objectActiveLinkInitial.id;
                    // this.selected.intfName2 = this.objectActiveLinkFinal.elementContainer + '-' + this.objectActiveLinkFinal.id;
                    this.herramienta = 'cursor';
                    this.selected = null;
                    this.objectActiveLinkInitial = null;
                    this.objectActiveLinkFinal = null;

              }
            };


            break;
          case "label":
            break;
          case "delete":
            var activeObject = this.canvas.getActiveObject();
            if(activeObject){
              this.deleteObjects(activeObject);
            }
            this.herramienta= 'cursor';
            break;
        }
      });

      this.canvas.on('object:moving', (e) =>{
        var elementMoving = e.target;
        // var p = e.target;
        console.log('Moving')
        switch(this.herramienta){
          case 'cursor':
            if(elementMoving != undefined){ 
              if(elementMoving.id.charAt(0) != 'e' ){
                for(var i = 0; i< elementMoving.connection.length; i++){
                  // Definicion para el Movimiento para el Controlador y sus Asociaciones
                  if(elementMoving.id.charAt(0) ==  'c'){
                    elementMoving.connection[i] && elementMoving.connection[i].set({
                      'x2': elementMoving.left + 30,
                      'y2': elementMoving.top + 35
                    });
                    this.canvas.renderAll();
                  }
                  // Definicion para el Movimiento de un Host o Switch y sus Asociaciones
                  else{
                    elementMoving.connection[i] && elementMoving.connection[i].set({
                      'x1': elementMoving.left + 30,
                      'y1': elementMoving.top + 35
                    });
                    this.canvas.renderAll();
                  }
                }
              }
              // Definicion para el Movimiento de los Puertos y sus Enlaces y Asociaciones
              else{
                for(var i = 0; i<elementMoving.connection.length; i++){

                  // Si el puerto esta en estado Conectado y tiene Enlaces
                  if(elementMoving.state == 'connected'){
                    // Movimiento para Los Enlaces del Puerto
                    if(elementMoving.connection[i].id == 'link'){
                      // Si el Puerto le Pertenece a un Switch
                      if(elementMoving.elementContainer.charAt(0) == 's'){
                        // Si este Puerto inicia el enlace
                        if(elementMoving.position == 'initial'){
                          elementMoving.connection[i] && elementMoving.connection[i].set({
                            // 'x1': elementMoving.left + 10,
                            // 'y1': elementMoving.top + 7
                            'x1': elementMoving.left + 10,
                            'y1': elementMoving.top + 7
                          });
                          this.canvas.renderAll();
                        }
                        // Si este Puerto finaliza el enlace
                        else if(elementMoving.position == 'terminal'){
                          elementMoving.connection[i] && elementMoving.connection[i].set({
                            'x1': elementMoving.left + 10,
                            'y1': elementMoving.top + 7
                          });
                          this.canvas.renderAll();
                        }
                        // Si este Puerto No esta conectado
                        else{
                          elementMoving.connection[i] && elementMoving.connection[i].set({
                            'x1': elementMoving.left + 10,
                            'y1': elementMoving.top + 7
                          });
                          this.canvas.renderAll();
                        };
                      }
                      // Si el Puerto le Pertenece a un Host
                      else{
                        if(elementMoving.position == 'initial'){
                          elementMoving.connection[i] && elementMoving.connection[i].set({
                            // 'x1': elementMoving.left + 10,
                            // 'y1': elementMoving.top + 7
                            'x1': elementMoving.left + 10,
                            'y1': elementMoving.top + 7
                          });
                          this.canvas.renderAll();
                        }
                        // Si este Puerto finaliza el enlace
                        else if(elementMoving.position == 'terminal'){
                          elementMoving.connection[i] && elementMoving.connection[i].set({
                            'x2': elementMoving.left + 10,
                            'y2': elementMoving.top + 7
                          });
                          this.canvas.renderAll();
                        }
                      }
                    }
                    // Mover una Asociacion
                    else {
                      //muevo la asociasion 
                      elementMoving.connection[i] && elementMoving.connection[i].set({
                          'x2': elementMoving.left + 10,
                          'y2': elementMoving.top + 7
                      });
                      this.canvas.renderAll();
                  }

                  }
                  else {
                    elementMoving.connection[i] && elementMoving.connection[i].set({
                        'x2': elementMoving.left + 10,
                        'y2': elementMoving.top + 7
                    });
                    this.canvas.renderAll();
                    }



                }
              }
            }

          //  case 'cursor':
          //   if (p.id.charAt(0) != "e") {
          //       for (var i = 0; i < p.connection.length; i++) {

          //           //p.connection[i] && p.connection[i].set({ 'x1': p.left + 30, 'y1': p.top + 35 });


          //           if (p.id.charAt(0) == "c") {

          //               p.connection[i] && p.connection[i].set({
          //                   'x2': p.left + 30,
          //                   'y2': p.top + 35
          //               });
          //               this.canvas.renderAll();

          //           } else {

          //               p.connection[i] && p.connection[i].set({
          //                   'x1': p.left + 30,
          //                   'y1': p.top + 35
          //               });
          //               this.canvas.renderAll();

          //           }
          //       }
          //       this.canvas.renderAll();

          //   } else {
          //       for (var i = 0; i < p.connection.length; i++) {

          //           if (p.state == "connected") {

          //               if (p.connection[i].id == "link") {
          //                   if (p.elementContainer.charAt(0) == "s") {
          //                       if (p.position == "initial") {
          //                           p.connection[i] && p.connection[i].set({
          //                               'x2': p.left + 10,
          //                               'y2': p.top + 7
          //                           });
          //                           this.canvas.renderAll();
          //                       } else if (p.position == "terminal") {
          //                           p.connection[i] && p.connection[i].set({
          //                               'x1': p.left + 10,
          //                               'y1': p.top + 7
          //                           });
          //                           this.canvas.renderAll();

          //                       } else {
          //                           p.connection[i] && p.connection[i].set({
          //                               'x1': p.left + 10,
          //                               'y1': p.top + 7
          //                           });
          //                           this.canvas.renderAll();
          //                       }

          //                   } else {
          //                       p.connection[i] && p.connection[i].set({
          //                           'x2': p.left + 10,
          //                           'y2': p.top + 7
          //                       });
          //                       this.canvas.renderAll();
          //                   }

          //               } else {
          //                   //muevo la asociasion 
          //                   p.connection[i] && p.connection[i].set({
          //                       'x2': p.left + 10,
          //                       'y2': p.top + 7
          //                   });
          //                   this.canvas.renderAll();
          //               }
          //           } else {
          //               p.connection[i] && p.connection[i].set({
          //                   'x2': p.left + 10,
          //                   'y2': p.top + 7
          //               });
          //               this.canvas.renderAll();
          //           }

          //       }
          //   }
          //   break;

        }
      });
      //Mouse up event
      this.canvas.on("mouse:up", (e) => {
        // this.panning = false;
        console.log("mu");
        // canvas.selection = true;
      });
      // Move the canvas event
      this.canvas.on("mouse:move", (options) => {
        var objActive = this.canvas.getActiveObject();
        var pointer = this.canvas.getPointer(options.e);
        var x2 = pointer.x; //get the current value of X
        var y2 = pointer.y; //get the current value of Y
        switch (this.herramienta) {

          case 'cursor':
              // if (options.target != null) {

              //     groupLabelController.set({
              //         left: x2,
              //         top: y2,
              //     });
              //     canvas.renderAll();

              // } else {

              //     groupLabelController.set({
              //         visible: false,
              //     });

              // }

              break;
          case 'link':
            console.log(this.herramienta);
            if (this.selected != null) {

                this.selected.set({
                    x2: x2, //set the line's x2 to the current X value of the mouse
                    y2: y2, //set the line's y2 to the current Y value of the mouse
                    selectable: true,
                    hasBorders: false,
                    hasControls: false,
                });
            }
            this.canvas.renderAll();
            break;
      };

    });
      // Doble Click en elemento Host 
      this.canvas.on('mouse:dblclick', (e) =>{
        switch(this.herramienta){
          case 'cursor':
            var objectActive = this.canvas.getActiveObject();
            if (objectActive != null) {
              this.action = 'visor';              
              var tagActive = objectActive.id;
              this.tagElement = tagActive;
              if(tagActive.charAt(0) == 'h'){
                if(objectActive.ipHost){
                  this.ipHost = objectActive.iPHost;
                };
                if(objectActive.sheduler){ 
                  this.sheduler = objectActive.sheduler;
                };
                if(objectActive.cpuLimit){
                  this.limitCpu = objectActive.cpuLimit;
                };
                if(objectActive.cpuCores){
                this.coreCpu = objectActive.cpuCores;
                };
                this.openModal('host');
              }else if(tagActive.charAt(0) == 's'){
                if(objectActive.type){
                  this.typeSwitch = objectActive.type;
                };
                if(objectActive.stp){ 
                  this.stpSwitch = objectActive.stp;
                };
                if(objectActive.stpPriority){ 
                  this.stpPriority = objectActive.stpPriority;
                };
                if(objectActive.ipSwitch){
                  this.ipSwitch = objectActive.ipSwitch;
                };
                if(objectActive.dpctlPort){
                  this.portSwitch = objectActive.dpctlPort;
                };
                if(objectActive.protocol){
                  this.protocolSwitch = objectActive.protocol;
                };
                if(objectActive.dataPath){
                  this.dataPath = objectActive.dataPath;
                };
                if(objectActive.dataPathId){
                  this.dataPathId = objectActive.dataPathId;
                };
                if(objectActive.dataPathOpt){
                  this.dataPathOpt = objectActive.dataPathOpt;
                };
                if(objectActive.failMode){
                  this.failMode = objectActive.failMode;
                };
                if(objectActive.reconnectedSwitch){
                  this.reconnectedSwitch = objectActive.reconnectedSwitch;
                };
                if(objectActive.inBand){
                  this.inBand = objectActive.inBand;
                };
                if(objectActive.inNameSpace){
                  this.inNameSpace = objectActive.inNameSpace;
                };
                if(objectActive.batch){
                  this.batch = objectActive.batch;
                };
                if(objectActive.verbose){
                  this.verbose = objectActive.verbose;
                };
                this.openModal('switch');
              }else if(tagActive.charAt(0) == 'c'){
                if(objectActive.type){
                  this.typeController = objectActive.type;
                };
                if(objectActive.iPController){
                  this.ipController = objectActive.iPController;
                };
                if(objectActive.portController){
                  this.portController = objectActive.portController;
                };
                if(objectActive.protocl){
                  this.protocolController = objectActive.protocol;
                };
                this.openModal('controller');
              }else if(tagActive.charAt(0) == 'e'){
                if(objectActive.ipPort){
                  this.ipPort = objectActive.ipPort;
                };
                if(objectActive.state){ 
                  if(objectActive.state == 'connected'){
                    this.linkActive = true;
                    objectActive.connection.forEach(cn =>{
                      if(cn.id == 'link'){
                        if(cn.loss){
                          this.lossLink = cn.loss;
                        };
                        if(cn.queue){
                          this.queueLink = cn.queue;
                        };
                        if(cn.jitter){
                          this.jitterLink = cn.jitter;
                        };
                        if(cn.delay){
                          this.delayLink = cn.dejay;
                        };
                        if(cn.bw){
                          this.bwLink = cn.bw;
                        };
                      }
                    });
                  }else{
                    this.linkActive = false;
                    this.lossLink = '';
                    this.queueLink = '';
                    this.jitterLink = '';
                    this.delayLink = '';
                    this.bwLink = '';
                  };
                };
                this.openModal('port');
              }
            }

        }

      });
    },

    openModal(mod) {
      var open = mod;
      if (open == "host") {
        this.stateIpHost = null;
        return this.$bvModal.show("modal-host");
      }
      if (open == "controller") {
        this.stateIpController = null;
        return this.$bvModal.show("modal-controller");
      }
      if (open == "switch") {
        this.stateIpSwitch = null;
        return this.$bvModal.show("modal-switch");
      }
      if (open == "port") {
        return this.$bvModal.show("modal-port");
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
       if (open == "linear") {
        console.log('Topo Linear') 
        this.topologyType = "linear";
        return this.$bvModal.show("modal-template");
      }
       if (open == "ring") {
        this.topologyType = "ring";
        return this.$bvModal.show("modal-template");
      }
      if (open == "play") {
        return this.$bvModal.show("modal-IpUser");
      }
      if (open == "traffic") {
        
        this.stateOKTrafic = false;
        this.typeTrafic = 'TCP';
        this.trafficModeSelected = "";
        this.distributionMode = '';
        this.checkerLong = false;
        this.valueLong = '';
        this.radioLong = '';
        this.checkerWindow = false;
        this.valueWindow = '';
        this.radioWindow = '';
        this.checkerBw = false;
        this.valueBw = '';
        this.radioBw = '';
        this.radioTime = '';
        this.checkerTime = false;
        this.radioPacket = '';
        this.radioKPacket = '';
        this.checkerPacket = false;
        this.checkerInterval = false;
        this.valueInterval = '';
        this.selectedClientHost = '';
        this.selectedServertHost = '';
        this.textTime = '';
        this.textPacket = '';
        this.textLong = '';
        this.textWindow = '';
        this.textBw = '';
        this.textInterval = '';
        this.stateTime = null;
        this.statePacket = null;
        this.stateLong = null;
        this.stateWindow = null;
        this.stateBw = null;
        this.stateInterval = null;

        return this.$bvModal.show("modal-traffic");
      }
      if (open == "done") {
        return this.$bvModal.show("modal-done");
      }
      if (open == "grafic") {
        this.grafficGenerator();
        return this.$bvModal.show("modal-grafic");
      }
      if (open == "info") {
        return this.$bvModal.show("modal-info");
      };
      if (open == 'specific'){
        return this.$bvModal.show("modal-specific");
      };
      if (open == "link") {
        return this.$bvModal.show("modal-link");
      };
      
    },

    closeModal(mod) {
      if (mod == "host") {
        this.ipHost = '';
        this.sheduler = 'Ninguno';
        this.limitCpu = '';
        this.coreCpu = '';
        return this.$bvModal.hide("modal-host");
      }
      if (mod == "switch") {
        this.typeSwitch = 'Ninguno';
        this.stpSwitch = '';
        this.stpPriority = '';
        this.ipSwitch = '';
        this.portSwitch = '';
        this.protocolSwitch = 'OpenFlow 1.2';
        this.dataPath = 'Ninguno';
        this.dataPathId = '';
        this.dataPathOpt ='';
        this.failMode = 'Ninguno';
        this.reconnectSwitch = '';
        this.inBand = '';
        this.inNameSpace = '';
        this.batch = '';
        this.verbose = '';
        return this.$bvModal.hide("modal-switch");
      }
      if (mod == "controller") {
        this.typeController = 'Por Defecto';
        this.ipController = '';
        this.portController = '';
        this.protocolController = 'Ninguno';
        return this.$bvModal.hide("modal-controller");
      }
      if (mod == "port") {
        this.ipPort = '';
        return this.$bvModal.hide("modal-port");
      }
      if (mod == "single") {
        return this.$bvModal.hide("modal-template");
      }
      if (mod == "linear") {
        return this.$bvModal.hide("modal-template");
      }
      if (mod == "play") {
        return this.$bvModal.hide("modal-IpUser");
      }
      if (mod == "traffic") {
        return this.$bvModal.hide("modal-traffic");
      }
      if (mod == "grafic") {
        return this.$bvModal.hide("modal-grafic");
      }
      if (mod == "done") {
        return this.$bvModal.hide("modal-done");
      }
      if (mod == "info") {
        return this.$bvModal.hide("modal-info");
      };
      if (mod == "link") {
        return this.$bvModal.hide("modal-link");
      }
    },

    disableAll() {
      $("#play-direct-access").css("disabled", "true");
    },

    loadInfoElements() {
      this.canvas.forEachObject((obj) => {
        //Recopila la información de cada Host
        
        if (obj.id.charAt(0) == "h") {
          var element = {};

          element['id'] = obj.id;
          // element['top'] = obj.top;
          // element['left'] = obj.left;
          if(obj.ipHost != '' && obj.ipHost != undefined){
            element['ipHost'] = obj.ipHost;
          };
          if(obj.sheduler !='Ninguno' && obj.sheduler != undefined){
            element['sheduler']= obj.sheduler;
          };
          if(obj.cpuLimit != '' && obj.cpuLimit != undefined){
            element['cpuLimit'] = obj.cpuLimit;
          };
          if(obj.cpuCores != '' && obj.cpuCores != undefined){
            element['cpuCores'] = obj.cpuCores;
          };

          this.elements.push(element);
        } 
        //Recopila la información de cada Switch
        else if (obj.id.charAt(0) == "s") {
          var element = {};
          element['id'] = obj.id;
          // element['top'] = obj.top;
          // element['left'] = obj.left;
          
          if(obj.ipSwitch != '' && obj.ipSwitch != undefined){
            element['ipSwitch'] = obj.ipSwitch;
          };
          if(obj.verbose != '' && obj.verbose != undefined && obj.verbose != 'not_accepted' ){
            element['verbose'] = obj.verbose;
          };
          if(obj.batch != '' && obj.batch != undefined && obj.batch != 'not_accepted'){
            element['batch'] = obj.batch;
          };
          if(obj.inNameSpace != '' && obj.inNameSpace != undefined && obj.inNameSpace != 'not_accepted'){
            element['inNameSpace'] = obj.inNameSpace;
          };
          if(obj.inBand != '' && obj.inBand != undefined && obj.inBand != 'not_accepted'){
            element['inBand'] = obj.inBand;
          };
          if(obj.failMode != 'Ninguno' && obj.failMode != undefined){
            element['failMode'] = obj.failMode;
          };
          if(obj.reconnectedSwitch != '' && obj.reconnectSwitch != undefined){
            element['reconnectedSwitch'] = obj.reconnectedSwitch;
          };
          if(obj.dataPath != 'Ninguno' && obj.dataPath != undefined){
            element['dataPath'] = obj.dataPath;
          };
          if(obj.dataPathId != '' && obj.dataPathId != undefined){
            element['dataPathId'] = obj.dataPathId;
          };
          if(obj.dataPathOpt != '' && obj.dataPathOpt != undefined){
            element['dataPathOpt'] = obj.dataPathOpt;
          };
          if(obj.protocol != undefined){
            element['protocol'] = obj.protocol;
          };
          if(obj.dpctlPort != '' && obj.dpctlPort != undefined){
            element['dpctlPort'] = obj.dpctlPort;
          };
          if(obj.stpSwitch != '' && obj.stpSwitch != undefined && obj.stpSwitch != 'not_stp'){
            element['stp'] = obj.stpSwitch;
          };
          if(obj.stpPriority != '' && obj.stpPriority != undefined){
            element['stpPriority'] = obj.stpPriority;
          };
          if(obj.type != 'Ninguno' && obj.type != undefined){
            element['type'] = obj.type;
          };
          if(obj.controller != '' && obj.controller != undefined){
            element['controller'] = obj.controller;
          };

          this.elements.push(element);
        } 
        //Recopila la información de cada Controlador
        else if (obj.id.charAt(0) == "c" && obj.id != 'controller') {
          var element = {};
          element['id'] = obj.id;
          // element['top'] = obj.top;
          // element['left'] = obj.left;
          if(obj.type != 'Por Defecto' && obj.type != undefined){
            element['type'] = obj.type;
          };
          if(obj.ipController != '' && obj.ipController != undefined){
            element['ipController'] = obj.ipController;
          };
          if(obj.portController != '' && obj.portController != undefined){
            element['port'] = obj.portController;
          };
          if(obj.protocol != 'Ninguno' && obj.protocol != undefined){
            element['protocol'] = obj.protocol;
          };
          
          this.elements.push(element);
        }
        //Recopila la información de cada Enlace
        else if (obj.id.charAt(0) == "l") {
          var element = {};
          element['id'] = obj.id;
          // element['top'] = obj.top;
          // element['left'] = obj.left;
          if(obj.loss != '' && obj.loss != undefined){
            element['loss'] = obj.loss;
          };
          if(obj.queue != '' && obj.queue != undefined){
            element['queue'] = obj.queue;
          };
          if(obj.jitter != '' && obj.jitterUdp != undefined){
            element['jitter'] = obj.jitter;
          };
          if(obj.delay != '' && obj.delay != undefined){
            element['delay'] = obj.delay;
          };
          if(obj.bw != '' && obj.bw != undefined){
            element['bw'] = obj.bw;
          };

          element['connection'] = obj.connectionLink;
          element['intfName1'] = obj.intfName1;
          element['intfName2'] = obj.intfName2;
          
          this.elements.push(element);
        } 
        //Recopila la información de cada Label
        else if (obj.id.charAt(1) == "a") {
          var element = {};
          //Para los Labels identifica la letra a de lAbel - Recopila la información de cada Label
          var element = {
            id: obj.id,
            rX: obj.left,
            rY: obj.top,
            label: obj.label,
          };
          elements.push(element);
        } 
        //Recopila la información de cada Puerto
        else if (obj.id.charAt(0) == "e") {
          var element = {};
          element['id'] = obj.id;
          // element['top'] = obj.top;
          // element['left'] = obj.left;
          element['intf'] = String(obj.elementContainer)+'-'+String(obj.id);
          

          if(obj.ipPort != '' && obj.ipPort){
              element['ipPort'] = obj.ipPort;
          };

          this.elements.push(element);
        }
      });
    },

    starEmulation() {
      this.loadInfoElements();
      this.llenarListaHost();
      var ipClient = this.ipClient;
      this.netWork["items"] = this.elements;
      this.netWork["IpClient"] = ipClient;

      console.log("Network Info");
      console.log(this.netWork);
      var json = JSON.stringify(this.netWork);
      this.closeModal("play");
      this.in_process = true;
      this.errorServer = false;
      this.alertText = "Creando la Red...";
      this.openModal("done");
      axios
        .post(this.path, this.netWork)
        .then((response) => {
          var validator = Object.keys(response.data).includes("red");

          if (validator == true) {
            this.in_process = false;
            this.alertText = "Red Creada Exitosamente.";
            this.play_activator = false;
            // this.openModal("done");
          } else {
            this.alertText = "Error en la Creación de la Red.";
            this.in_process = false;
            var error = data["Error"];
            this.serverText = "Error: " + String(error);
            this.errorServer = true;
            // this.openModal("done");
          }
        })
        .catch((error) => {
          this.alertText = "Error en la Creación de la Red.";
          this.in_process = false;
          this.serverText = "Error: Failed to Connect" ;
          this.errorServer = true;
        });
    },

    stopEmulation() {
      var actionDir = {};
      actionDir["action"] = "stop";
      axios.post(this.path, actionDir).then((response) => {
        alert(JSON.stringify(response.data));
        this.elements = [];
        this.netWork = {};
        this.play_activator = true;
        this.traffic_activator = true;
      });
    },
    validatorDataTrafic(){
      
      this.labelsGraphic = [];
      this.datosYBitsPerSecond = [];
      this.datosYNumBytes = [];
      this.datosYPmtu = [];
      this.datosYRetransmits = [];
      this.datosYRtt = [];
      this.datosYRttVar = [];
      this.datosYSndCwnd = [];
      
      var modeOp = "";
      var traficDir = {};
      var auxTraficDir = {};
      
      if(this.trafficModeSelected != ''){
        if(this.trafficModeSelected == 'global'){
          traficDir['global'] = 'true';
          modeOp = 'GLOBAL';
          if(this.distributionMode == 'one'){
            traficDir['one_for_all'] = 'true';
            modeOp = 'ONE FOR ALL';
          }else if(this.distributionMode =='all'){
            traficDir['all_for_all'] = 'true';
            modeOp = 'ALL FOR ALL';
          }else{
            this.stateOKTrafic = false;
          }
        }else if(this.trafficModeSelected == 'specific'){
          traficDir['specific'] = [{}];
          if(this.selectedClientHost != '' && this.selectedServertHost != '' && this.selectedServertHost != this.selectedClientHost){
            traficDir['specific'][0]['host_client'] = String(this.selectedClientHost);
            traficDir['specific'][0]['host_server'] = String(this.selectedServertHost); 
          }else{
            this.stateOKTrafic = false;
          }
        }else if(this.trafficModeSelected == 'xtreme'){
          traficDir['xtreme'] = true;
        }
      }else{
        this.stateOKTrafic = false;
      }
      

      if (this.radioTime == 't'){
        if(this.textTime != ''){
          this.stateTime = true;
          auxTraficDir['t'] = String(this.textTime);
          this.stateOKTrafic = true;
        }else{
          this.stateTime =false;
          this.stateOKTrafic = false;
        }
      };
      if(this.radioPacket == 'n'){
        if(this.textPacket != ''){
          this.statePacket = true;
          auxTraficDir['n'] = String(this.textPacket)+String(this.radioKPacket);
          this.stateOKTrafic = true;
        }else{
          this.statePacket = false;
          this.stateOKTrafic = false;
        }
      };
      if(this.valueLong == 'l'){
        if(this.textLong != ''){
          this.stateLong = true;
          auxTraficDir['l'] = String(this.textLong)+String(this.radioLong);
          this.stateOKTrafic = true;
        }else{
          this.stateLong= false;
          this.stateOKTrafic = false;
        }
      };
      if(this.valueWindow == 'w'){
        if(this.textWindow != ''){
          this.stateWindow = true;
          auxTraficDir['w'] = String(this.textWindow)+String(this.radioWindow);
          this.stateOKTrafic = true;
        }else{
          this.stateWindow = false;
          this.stateOKTrafic = false;
        }
      };
      if(this.valueBw == 'b'){
        if(this.textBw != ''){
          this.stateBw = true;
          auxTraficDir['b'] = String(this.textBw)+String(this.radioBw);
          this.stateOKTrafic = true;
        }else{
          this.stateBw = false;
          this.stateOKTrafic = false;
        }
      };
      if(this.valueInterval == 'i'){
        if(this.textInterval != ''){
          this.stateInterval = true;
          auxTraficDir['i'] = String(this.textInterval);
          this.stateOKTrafic = true;
        }else{
          this.stateInterval = false;
          this.stateOKTrafic = false;

        }
      };
      if (this.typeTrafic == "TCP") {
        traficDir["TCP"] = [auxTraficDir];
        this.protocolTrafficActual = "TCP";
      } else if(this.typeTrafic == 'UDP'){
        traficDir["UDP"] = [auxTraficDir];
        this.protocolTrafficActual = "UDP";
      }

      
      if(this.stateOKTrafic == true){
        this.closeModal('traffic');
        this.traficGenerator(traficDir,modeOp);
      }
    },

    traficGenerator(traficDir,modeOp) {
      this.closeModal("traffic");
      this.alertText = "Procesando Tráfico...";
      this.in_process = true;
      this.errorServer = false;
      this.openModal("done");
      
      axios
        .post(this.path, traficDir)
        .then((response) => {
          // Mensaje Confirmación de Tráfico
          var data = response.data;
          if ( Object.keys(data).length == 0 ||
            Object.keys(data).includes("Error") ||
            data == ""
          ) {
            this.alertText = "Error en la Ejecución.";
            this.in_process = false;
            if (Object.keys(data).includes("Error")) {
              var error = data["Error"];
              this.serverText = "Error: " + String(error);
              this.errorServer = true;
            } else {
              this.serverText = "Error: Response Collapsed";
              this.errorServer = true;
            }
          } else {
            this.alertText = "Tráfico Creado con Éxito.";
            this.in_process = false;
            this.play_activator = false;
            this.traffic_activator = false;
            console.log(data);

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
            var numTotalTempos = 0;
            //Obtención de Datos para Analizador Gráfico}
            //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

            if (this.protocolTrafficActual == "TCP") {
              for (var k in data) {
                var sp = String(k).split("_");

                //Si el valor despues del separador es una h la respuesta proviene del Host-Cliente
                if (String(sp[1]).charAt(0) == "h") {
                  // Verifica el mayor numero de tiempos generado para despues asignarlo al eje x de la grafica
                  var long = parseInt(Object.keys(data[k]["speciffic"]).length);
                  if (long >= numTotalTempos) {
                    numTotalTempos = long;
                  }
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

                  intervalLabels = numTotalTempos;

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
                  // Verifica el mayor numero de tiempos generado para despues asignarlo al eje x de la grafica
                  var long = parseInt(Object.keys(data[k]["speciffic"]).length);
                  if (long >= numTotalTempos) {
                    numTotalTempos = long;
                  }

                  for (var t in data[k]["speciffic"]) {
                    totalBytesTxServer =
                      totalBytesTxServer +
                      parseInt(data[k]["speciffic"][t]["n_bytes"]);
                    bitsPerSecondServer =
                      bitsPerSecondServer +
                      parseInt(data[k]["speciffic"][t]["bits_per_second"]);

                    counter = counter + 1;
                    var llave = String(t);

                    //console.log('HOST ' + String(k));
                    //console.log('Trafico: ' + JSON.stringify(trafficValues));

                    //Valores Numero de Bytes
                    if (
                      Object.keys(trafficValuesServer).includes(
                        String(t) + "_num_bytes"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValuesServer[llave + "_num_bytes"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["n_bytes"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValuesServer[llave + "_num_bytes"] = totalNumBytes;
                    } else {
                      trafficValuesServer[llave + "_num_bytes"] = parseInt(
                        data[k]["speciffic"][t]["n_bytes"]
                      );
                    }

                    //Valores Bits por Segundo
                    if (
                      Object.keys(trafficValuesServer).includes(
                        String(t) + "_bits_per_second"
                      )
                    ) {
                      var valActualNumBytes = parseInt(
                        trafficValuesServer[llave + "_bits_per_second"]
                      );
                      var valorSumar = parseInt(
                        data[k]["speciffic"][t]["bits_per_second"]
                      );

                      var totalNumBytes = valActualNumBytes + valorSumar;
                      trafficValuesServer[
                        llave + "_bits_per_second"
                      ] = totalNumBytes;
                    } else {
                      trafficValuesServer[
                        llave + "_bits_per_second"
                      ] = parseInt(data[k]["speciffic"][t]["bits_per_second"]);
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
                  //Promedio de Bytes Transmitidos en la Emulacion del Trafico Servidor

                  promTotalBytesTxServer = totalBytesTx / counter;
                  promBitsPerSecondServer = bitsPerSecond / counter;

                  for (var o in trafficValuesServer) {
                    for (var q = 0; q < numTotalTempos; q++) {
                      if (String(o) == "t_" + String(q) + "_num_bytes") {
                        this.datosYNumBytesServer[q] = trafficValues[o];
                      }
                      if (String(o) == "t_" + String(q) + "_bits_per_second") {
                        this.datosYBitsPerSecondServer[q] = trafficValues[o];
                      }
                    }
                  }
                }
              }
              //Eje X
              // var numLabels = time_e / interval;
              for (var i = 0; i <= numTotalTempos; i++) {
                this.labelsGraphic.push("t " + String(i));
              }
              // El ultimo tiempo genera 0 en todo ya que ahi acaba la emulación, se agrega a continuacion
              this.datosYNumBytes.push(0);
              this.datosYBitsPerSecond.push(0);
              this.datosYNumBytesServer.push(0);
              this.datosYBitsPerSecondServer.push(0);
              this.datosYSndCwnd.push(0);
              this.datosYRetransmits.push(0);
              this.datosYRtt.push(0);
              this.datosYRttVar.push(0);
              this.datosYPmtu.push(0);

              //Server TCP
              this.modeOpTcp = modeOp;
              this.protocolTcp = protocol;
              this.timeTcp = time_e;
              this.sizeBlockTcp = blkSize;
              this.blockTcp = blocks;
              this.tcpMssTcp = tcpMssDefault;
              this.sndBufferTcp = sndBufActual;
              this.rcvBufferTcp = rcvBufActual;
              this.totalBytesTcpServer = totalBytesTxServer;
              this.promTotalBytesTcpServer = promTotalBytesTxServer;
              this.promBitsPerSecondTcpServer = promBitsPerSecondServer;
              

              //Cliente TCP
              this.totalBytesTcpclient = totalBytesTx;
              this.promTotalBytesTcpClient = promTotalBytesTx;
              this.promBitsPerSecondTcpClient = promBitsPerSecond;
              this.promSndCwndTcp = promSndCwnd;
              this.promRttTcp = promRtt;
              this.promRetransmitsTcp = promRetransmits;
              this.promRttVarTcp = promRttVar
              this.promPmtuTcp = promPmtu;             

            }
          }
        })
        .catch((error) => {
          this.alertText = "Error en la Creación del Tráfico.";
          this.in_process = false;
          this.serverText = "Error: Failed to Connect" ;
          this.errorServer = true;
        });
    },
    grafficGenerator() {
      this.canvasGraphic = true;
      this.metrics = true;
      this.protocolTrafficActual = 'TCP'; //Quitar esta Linea - solo es para pruebas
      if (this.protocolTrafficActual == 'TCP'){
        this.activeUdp = false;
        this.activeTcp = true;
        if (this.trafficGraphic == "Servidor") {
          this.totalAnswerUdp = false;
          this.clientAnswerUdp = false;
          this.serverAnswerUdp = false;
          this.clientAnswerTcp = false;
          this.totalAnswerTcp = false;
          this.serverAnswerTcp = true;

          this.totalBytesTcp = this.totalBytesTcpServer;
          this.promTotalBytesTcp = this.promTotalBytesTcpServer;
          this.promBitsPerSecondTcp = this.promBitsPerSecondTcpServer;

          this.chartdata = {
            labels: this.labelsGraphic,
            datasets: [
              {
                label: "Total de Bytes Transmitidos",
                data: this.datosYNumBytesServer,
                backgroundColor: ["rgba(54, 162, 235, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "Bits por Segundo",
                data: this.datosYBitsPerSecondServer,
                backgroundColor: ["rgba(111, 194, 63, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
            ],
          };
          this.options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            responsive: true,
            maintainAspectRatio: false,
          };



        } else if (this.trafficGraphic == "Cliente") {
          this.totalAnswerUdp = false;
          this.totalAnswerTcp = false;
          this.clientAnswerUdp = false;
          this.serverAnswerTcp = false;
          this.serverAnswerUdp = false;
          this.clientAnswerTcp = true;

          
          this.totalBytesTcp = this.totalBytesTcpclient;
          this.promTotalBytesTcp = this.promTotalBytesTcpClient;
          this.promBitsPerSecondTcp = this.promBitsPerSecondTcpClient;

          this.chartdata = {
            labels: this.labelsGraphic,
            datasets: [
              {
                label: "Total de Bytes Transmitidos",
                data: this.datosYNumBytes,
                backgroundColor: ["rgba(54, 162, 235, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "Bits por Segundo",
                data: this.datosYBitsPerSecond,
                backgroundColor: ["rgba(111, 194, 63, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "SND CWND",
                data: this.datosYSndCwnd,
                backgroundColor: ["rgba(226, 33, 33, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "Bytes Retransmitidos",
                data: this.datosYRetransmits,
                backgroundColor: ["rgba(226, 165, 33, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "RTT",
                data: this.datosYRtt,
                backgroundColor: ["rgba(33, 226, 226, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "RTT VAR",
                data: this.datosYRttVar,
                backgroundColor: ["rgba(101, 33, 226, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "PMTU",
                data: this.datosYPmtu,
                backgroundColor: ["rgba(226, 33, 168, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
            ],
          };
          this.options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            responsive: true,
            maintainAspectRatio: false,
          };

    
        } else if (this.trafficGraphic == "General") {
          this.totalAnswerUdp = false;
          this.clientAnswerUdp = false;
          this.serverAnswerTcp = false;
          this.serverAnswerUdp = false;
          this.clientAnswerTcp = false;
          this.totalAnswerTcp = true;

          var totalDatosYNumBytes = [];
          var totalDatosYBitsPerSecond = [];
          var longClient = this.datosYNumBytes.length;
          var longServer = this.datosYNumBytesServer.length;
          var longServerBits = this.datosYBitsPerSecondServer.length;
          var longClientBits = this.datosYBitsPerSecond.length;

          //Suma los datos Totales de Numero de Bytes del Cliente y Servidor
          if(longClient > longServer){
            for(var i = 0; i < longClient; i ++){
              if (i >= longServer){
                var total = this.datosYNumBytes[i] + 0;
                totalDatosYNumBytes[i] = total;
              }else{
                var total = this.datosYNumBytes[i] + this.datosYNumBytesServer[i]
                totalDatosYNumBytes[i] = total;
              }
            }
          }else if(longClient < longServer){
            for(var i = 0; i < longServer; i ++){
              if (i >= longClient){
                var total = this.datosYNumBytesServer[i] + 0;
                totalDatosYNumBytes[i] = total;
              }else{
                var total = this.datosYNumBytes[i] + this.datosYNumBytesServer[i]
                totalDatosYNumBytes[i] = total;
              }
            }
          }else{
            for(var i = 0; i < longClient; i ++){
                var total = this.datosYNumBytes[i] + this.datosYNumBytesServer[i]
                totalDatosYNumBytes[i] = total;
            }
          }
          //Suma los datos Totales de Numero de Bits por Segundo del Cliente y Servidor
          if(longClientBits > longServerBits){
            for(var i = 0; i < longClientBits; i ++){
              if (i >= longServerBits){
                var total = this.datosYBitsPerSecond[i] + 0;
                totalDatosYBitsPerSecond[i] = total;
              }else{
                var total = this.datosYBitsPerSecond[i] + this.datosYBitsPerSecondServer[i]
                totalDatosYBitsPerSecon[i] = total;
              }
            }
          }else if(longClientBits < longServerBits){
            for(var i = 0; i < longServerBits; i ++){
              if (i >= longClientBits){
                var total = this.datosYBitsPerSecondServer[i] + 0;
                totalDatosYBitsPerSecond[i] = total;
              }else{
                var total = this.datosYBitsPerSecond[i] + this.datosYBitsPerSecondServer[i]
                totalDatosYBitsPerSecond[i] = total;
              }
            }
          }else{
            for(var i = 0; i < longClient; i ++){
                var total = this.datosYBitsPerSecond[i] + this.datosYBitsPerSecondServer[i]
                totalDatosYBitsPerSecond[i] = total;
            }
          };
          // Calulo de Totales y Promedio Generales del Tráfico
          var totalBytesTcpTotal = 0;
          var promTotalBytesTcpTotal = 0;
          var promTotalBitsPerSecondTcpTotal = 0;

          for(var i=0 ; i<totalDatosYNumBytes.length; i++){
            totalBytesTcpTotal = totalBytesTcpTotal + totalDatosYNumBytes[i];
          };
          for(var i=0 ; i<totalDatosYBitsPerSecond.length; i++){
            promTotalBitsPerSecondTcpTotal = promTotalBitsPerSecondTcpTotal + totalDatosYBitsPerSecond[i];
          };

          this.totalBytesTcp = totalBytesTcpTotal;
          this.promTotalBytesTcp = totalBytesTcpTotal / totalDatosYNumBytes.length;
          this.promBitsPerSecondTcp = promTotalBitsPerSecondTcpTotal / totalDatosYBitsPerSecond.length;

          this.chartdata = {
            labels: this.labelsGraphic,
            datasets: [
              {
                label: "Total de Bytes Transmitidos",
                data: totalDatosYNumBytes,
                backgroundColor: ["rgba(54, 162, 235, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
              {
                label: "Bits por Segundo",
                data: totalDatosYBitsPerSecond,
                backgroundColor: ["rgba(111, 194, 63, 0.7)"],
                borderWidth: 1,
                steppedLine: true,
              },
            ],
          };
          this.options = {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            responsive: true,
            maintainAspectRatio: false,
          };
          

        }
      }
      else if(this.protocolTrafficActual == 'UDP'){
        
      };
    },
    changeGraphic() {
      this.grafficGenerator();
    },

    // Creacion elementos Fabric
    makeLink(coords, linkType) {
      if (linkType == "controller") {
        return new fabric.Line(coords, {
          fill: "violet",
          stroke: "#9733FA",
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
          id: "controller",
          // Si esta asosiado a un switch
          swLoad: []
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
          belonging: '',
          
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
          belonging: ''
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
    // Funcion que valida un ip sin mask
    validateIp(ip){
      const patronIp= new RegExp("^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$");
      if(ip.search(patronIp) !== 0){
        return false;
      }else{
        return true;
      }
    },
    // Actualiza o Inserta un elemento con sus opciones
    element() {
      if (this.tagElement.charAt(0) == "h") {
        var ipHostOk = '';
        if(this.ipHost != ''){
          if(this.validateIp(this.ipHost)){
            this.stateIpHost = true;
            ipHostOk = this.ipHost;
          }else{
            this.stateIpHost = false;
          };
        }else{
          this.stateIpHost = true;
        };
        if(this.stateIpHost == true || this.stateIpHost == null){ 
          if(this.action != 'visor'){
            this.armElement("h");
            this.tagHost.push(this.tagElement);
          };
        this.canvas.forEachObject((obj) => {
          if (obj.id == this.tagElement) {
            obj.ipHost = ipHostOk;
            obj.sheduler = this.sheduler;
            obj.cpuLimit = this.limitCpu;
            obj.cpuCores = this.coreCpu;
          }
        });
          this.closeModal("host");
          // Reiniciar Variables a su estado Inicial
          this.ipHost = '';
          this.sheduler = 'Ninguno';
          this.limitCpu = '';
          this.coreCpu = '';
        };
      } else if (this.tagElement.charAt(0) == "s") {
        var ipSwitchOk ='';
        if(this.ipSwitch != ''){
          if(this.validateIp(this.ipSwitch)){
            ipSwitchOk = this.ipSwitch;
            this.stateIpSwitch = true;
          }else{
            this.stateIpSwitch = false;
          }
        }else{
          this.stateIpSwitch = true;
        };

        if(this.stateIpSwitch == true || this.stateIpSwitch == null){ 
          if(this.action != 'visor'){
            this.armElement("s");
            this.tagSwitch.push(this.tagElement);
          };
        this.canvas.forEachObject((obj) => {
          if (obj.id == this.tagElement) {
            obj.verbose = this.verbose;
            obj.batch = this.batch;
            obj.inNameSpace = this.inNameSpace;
            obj.inBand = this.inBand;
            obj.reconnectSwitch = this.reconnectSwitch;
            obj.failMode = this.failMode;
            obj.dataPathOpt = this.dataPathOpt;
            obj.dataPathId = this.dataPathId;
            obj.dataPath = this.dataPath;
            obj.protocol = this.protocolSwitch;
            obj.dpctlPort = this.portSwitch;
            obj.ipSwitch = ipSwitchOk;
            obj.stpPriority = this.stpPriority;
            obj.stp = this.stpSwitch;
            obj.type = this.typeSwitch;
          }
        });
        this.closeModal("switch");
        // Reiniciar variables a su estado Inicial
        this.typeSwitch = 'Ninguno';
        this.stpSwitch = '';
        this.stpPriority = '';
        this.ipSwitch = '';
        this.portSwitch = '';
        this.protocolSwitch = 'OpenFlow 1.2';
        this.dataPath = 'Ninguno';
        this.dataPathId = '';
        this.dataPathOpt ='';
        this.failMode = 'Ninguno';
        this.reconnectSwitch = '';
        this.inBand = '';
        this.inNameSpace = '';
        this.batch = '';
        this.verbose = '';
        }

      } else if (this.tagElement.charAt(0) == "c") {
        var ipControllerOk = '';
        if(this.ipController != ''){
          if(validateIp(this.ipController)){
            ipControllerOk = this.ipController;
            this.stateIpController = true;
          }else{
            this.stateIpcontroller = false;
          }
        }else{
          this.stateIpController = true;
        };

        if(this.stateIpSwitch == true || this.stateIpSwitch == null){
          if(this.action != 'visor'){
            this.armElement("c");
            this.tagController.push(this.tagElement);
          };
        this.canvas.forEachObject((obj) => {
          if (obj.id && obj.id === this.tagElement) {
            obj.type = this.typeController;
            obj.ipController = ipControllerOk;
            obj.portController = this.portController;
            obj.protocol = this.protocolController;
          }
        });
        this.closeModal("controller");
        // Reiniciar Variables a su estado Inicial
        this.typeController = 'Por Defecto';
        this.ipController = '';
        this.portController = '';
        this.protocolController = 'Ninguno';
        };
        
      }
      // Este no es para un puerto eth sino para el Link que contiene la opcion de agregar o no un puerto esta en addPort()
      else if (this.tagElement.charAt(0) == "e"){
        var port = this.canvas.getActiveObject();
        port.connection.forEach(cn =>{
          if(cn.id == 'link'){
            cn.loss = this.lossLink;
            cn.queue = this.queueLink;
            cn.jitter = this.jitterLink;
            cn.delay = this.delayLink;
            cn.bw = this.bwLink;
          };
        });
        this.closeModal('link');
        this.lossLink = '';
        this.queueLink = '';
        this.jitterLink = '';
        this.delayLink = '';
        this.bwLink = '';
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
          connection.x1 = this.x0 + 30; //Coordenadas del Host x "centro"
          connection.y1 = this.y0 + 35; //Coordenadas del Host y  "centro"
          connection.x2 = this.x0 + i * 65 - 5;
          connection.y2 = this.y0 + 107;
          connection.id = "a" + i;
          elemento.elementConnection.push(connection);

          var link = this.makeLink(
            [connection.x1, connection.y1, connection.x2, connection.y2],
            "portHost"
          );
          link.belonging= this.tagElement;
          elemento.connectionLine.push(link);
          groupHost.connection.push(link);
        }

        // Asociamos el grupo con cada enlace
        // for (var i = 0; i < 2; i++) {
        //   var line = elemento.connectionLine[i];
        //   groupHost.line = line;
        // }
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
          connection.x1 = this.x0 + 30; // Coordenadas iniciales x centro switch
          connection.y1 = this.y0 + 35; // Coordenadas iniciales y centro switch
          connection.x2 = this.x0 + i * 65 - 130;
          connection.y2 = this.y0 + 107;
          connection.id = "a" + i;
          elemento.elementConnection.push(connection);

          var link = this.makeLink(
            [connection.x1, connection.y1, connection.x2, connection.y2],
            "portSwitch"
          );
          link.belonging = this.tagElement;
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
        
      }
    },

    addPort(){
      var objectActive = this.canvas.getActiveObject();
      
      if(objectActive != null){
        if(this.action != 'visor'){ 
          if(objectActive.id.charAt(0) == 's' || objectActive.id.charAt(0) == 'h'){
            var aux = objectActive.connection.length;
            console.log(objectActive.connection[aux-1].id);
            var interfaces = [];
            this.canvas.forEachObject((object) =>{
              if(object.elementContainer == objectActive.id){
                interfaces.push(object);
              }
            });

            console.log(interfaces);
            var obj = interfaces[interfaces.length-1];
            var indice = parseInt(obj.id.split('eth')[1]) + 1;
            
            var left = obj.left;  
            var top = obj.top;

            var port = new Image();
            port.src = require("../assets/img/port.png");
            var pt = new fabric.Image(port);
            pt.set({
              scaleX: 0.035,
              scaleY: 0.035,
              padding: 0,
              connectionLine: [], // Contenedor de las lineas de conexión.
            });
            var label = new fabric.Textbox("eth" + (indice) , {
              top: 22,
              left: -5,
              fontFamily: "arial",
              fill: "#15435d",
              fontSize: 15,
            });

            var groupHostPort = new fabric.Group([pt, label], {
              left: left+ (65 - 15),
              top: top,
              hasControls: false,
              hasBorders: false,
              transparentCorners: false,
              selectable: true,
              elementContainer: objectActive.id,
              identificator: "Hp",
              id: "eth" + (indice),
              connection: [], // Contenedor de lineas de conexión del grupo.
            });
            this.canvas.add(groupHostPort);
            var connection = {};
            connection.type = "association";
            connection.elementOrigin = objectActive.id;
            connection.x1 = objectActive.left + 30; //Coordenadas del Host x "centro"
            connection.y1 = objectActive.top + 35; //Coordenadas del Host y  "centro"
            connection.x2 = left + 60;
            connection.y2 = top + 7;
            connection.id = "a" + indice;
            if(objectActive.id.charAt(0) == 'h'){ 
              var link = this.makeLink([connection.x1,connection.y1, connection.x2, connection.y2], 'portHost');
              link.belonging = objectActive.id;
            }
            else{ 
              var link = this.makeLink([connection.x1,connection.y1, connection.x2, connection.y2], 'portSwitch');
              link.belonging = objectActive.id;
            }
            objectActive.connection.push(link);
            objectActive.line = link;
            groupHostPort.connection.push(link);
            groupHostPort.ipPort = (this.ipPort);
            this.canvas.add(link);
            this.canvas.sendToBack(link);
            this.herramienta = 'cursor';
          };
        }else{
          objectActive.ipPort = this.ipPort;
        }
      };
      this.closeModal('port');
      this.ipPort = ''
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
          var numberHost = this.numHostTopology;
          this.numHost = numberHost;
          this.topologyMaker();
          this.closeModal("single");
          break;
        
        case "linear":
          var numberHost = this.numHostTopology
          this.numHost = numberHost
          this.topologyMaker();
          this.closeModal('linear')
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
          link.belonging = tag,
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
            link.belonging = tag;
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
            "controller"
          );
          
          // Agrega la asociacion del controlador y el switch al arreglo del la red
          this.canvas.forEachObject((obj) =>{
            if(obj.id == String(this.tagSwitch[this.tagSwitch.length-1]) ){
              obj.controller = tag;
              link.swLoad.push(String(this.tagSwitch[this.tagSwitch.length-1]));
            };
          });       

          // Agrega la asociacion al arreglo de conexciones del Controlador
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
      }else if (topo == "linear") {
        if (tag.charAt(0) == 'h') {

            var groupHost = new fabric.Group([elemento, text], {
                left: x,
                top: y + 160,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                id: tag,
                connection: [],
            });


            connection.type = "association";
            connection.elementOrigin = tag;
            connection.x1 = x + 30;
            connection.y1 = y + 195;
            connection.x2 = (x + (1 * 65)) - 35;
            connection.y2 = y + 107;
            connection.id = "a" + 0;

            var link = this.makeLink([connection.x1, connection.y1, connection.x2, connection.y2], "portHost");
            groupHost.connection.push(link);



            var line = groupHost.connection[i];
            groupHost.line = line;


            var port = new Image();
            port.src = require("../assets/img/port.png");


            var pt = new fabric.Image(port);
            pt.set({
                scaleX: 0.035,
                scaleY: 0.035,
                padding: 0,
                id: tag,
            });

            var label = new fabric.Textbox("eth" + 0, {
                top: 22,
                left: -5,
                fontFamily: 'arial',
                fill: '#15435d',
                fontSize: 15
            });

            var groupHostPort = new fabric.Group([pt, label], {

                left: (x + (1 * 65)) - 48,
                top: y + 100,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                elementContainer: tag,
                identificator: 'Hp',
                id: "eth" + 0,
                connection: [], // Contenedor de lineas de conexión del grupo.

            });
            groupHostPort.connection.push(groupHost.connection[0]);

            var l = groupHost.connection[0];

            this.canvas.add(groupHost.connection[0]);
            this.canvas.add(groupHostPort);

            this.canvas.add(groupHost);
            this.tagHost.push("h" + (this.tagHost.length + 1));

        } else if (tag.charAt(0) == 's') {

            var groupSwitch = new fabric.Group([elemento, text], {

                //left: ((numHost * 100) / 2) + 35,
                left: x - 90,
                top: y - 35,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                id: tag,
                connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[])) 
                type: null
            });

            var port = new Image();
            port.src = require("../assets/img/port.png");

            var tagS = [];
            tagS.push(tag);

            connection.type = "association";
            connection.elementOrigin = tag;
            connection.x1 = x - 60;
            connection.y1 = y - 3;
            connection.x2 = (x - 130);
            connection.y2 = y - 3;
            connection.id = "a" + 0;

            var link0 = this.makeLink([connection.x1, connection.y1, connection.x2, connection.y2], "portSwitch");
            groupSwitch.connection.push(link0);


            var pt0 = new fabric.Image(port);
            pt0.set({
                scaleX: 0.035,
                scaleY: 0.035,
                padding: 0,
                id: tag,
                connectionLine: [], // Contenedor de las lineas de conexión.
            });

            // Asignación de lineas por cada puerto  
            //pt0.connectionLine.push(elemento.connectionLine[0]);

            var label0 = new fabric.Textbox("eth" + 0, {
                top: 22,
                left: -5,
                fontFamily: 'arial',
                fill: '#15435d',
                fontSize: 15
            });

            var groupSwitchPort0 = new fabric.Group([pt0, label0], {

                //left: (x + (i * 100)) - 19,
                left: (x - 145),
                top: y - 10,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                elementContainer: tag,
                identificator: 'Sp',
                id: "eth" + 0,
                connection: [], // Contenedor de lineas de conexión del grupo.

            });

            var line0 = groupSwitch.connection[0];

            groupSwitchPort0.connection.push(groupSwitch.connection[0]);
            groupSwitchPort0.line = line0;


            connection.type = "association";
            connection.elementOrigin = tag;
            connection.x1 = x - 60;
            connection.y1 = y;
            connection.x2 = x - 60;
            connection.y2 = y + 48;
            connection.id = "a" + 1;

            var link1 = this.makeLink([connection.x1, connection.y1, connection.x2, connection.y2], "portSwitch");
            groupSwitch.connection.push(link1);


            var pt1 = new fabric.Image(port);
            pt1.set({
                scaleX: 0.035,
                scaleY: 0.035,
                padding: 0,
                id: tag,
                connectionLine: [], // Contenedor de las lineas de conexión.
            });

            // Asignación de lineas por cada puerto  
            // pt1.connectionLine.push(groupSwitch.connection[1]);

            var label1 = new fabric.Textbox("eth" + 1, {
                top: 22,
                left: -5,
                fontFamily: 'arial',
                fill: '#15435d',
                fontSize: 15
            });

            var groupSwitchPort1 = new fabric.Group([pt1, label1], {

                //left: (x + (i * 100)) - 19,
                left: (x - 73),
                top: y + 48,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                elementContainer: tag,
                identificator: 'Sp',
                id: "eth" + 1,
                connection: [], // Contenedor de lineas de conexión del grupo.

            });

            var line1 = groupSwitch.connection[1];

            groupSwitchPort1.connection.push(groupSwitch.connection[1]);
            groupSwitchPort1.line = line1;





            connection.type = "association";
            connection.elementOrigin = tag;
            connection.x1 = x - 60;
            connection.y1 = y - 1;
            connection.x2 = x + 30;
            connection.y2 = y - 3;
            connection.id = "a" + 2;

            var link2 = this.makeLink([connection.x1, connection.y1, connection.x2, connection.y2], "portSwitch");
            groupSwitch.connection.push(link2);



            var pt2 = new fabric.Image(port);
            pt2.set({
                scaleX: 0.035,
                scaleY: 0.035,
                padding: 0,
                id: tag,
                connectionLine: [], // Contenedor de las lineas de conexión.
            });

            // Asignación de lineas por cada puerto  
            //pt0.connectionLine.push(elemento.connectionLine[0]);

            var label2 = new fabric.Textbox("eth" + 2, {
                top: 22,
                left: -5,
                fontFamily: 'arial',
                fill: '#15435d',
                fontSize: 15
            });

            var groupSwitchPort2 = new fabric.Group([pt2, label2], {

                //left: (x + (i * 100)) - 19,
                left: (x + 10),
                top: y - 10,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                elementContainer: tag,
                identificator: 'Sp',
                id: "eth" + 2,
                connection: [], // Contenedor de lineas de conexión del grupo.

            });

            var line2 = groupSwitch.connection[2];

            groupSwitchPort2.connection.push(groupSwitch.connection[2]);
            groupSwitchPort2.line = line2;

            groupSwitchPort0.connection.push(groupSwitch.connection[0]);
            groupSwitchPort0.line = line0;

            this.canvas.add(groupSwitch.connection[0]);
            this.canvas.add(groupSwitch.connection[1]);
            this.canvas.add(groupSwitch.connection[2]);
            this.canvas.add(groupSwitchPort0);
            this.canvas.add(groupSwitchPort1);
            this.canvas.add(groupSwitchPort2);





            // }
            this.canvas.add(groupSwitch);
            this.tagSwitch.push("s" + (this.tagSwitch.length + 1));

        } else if (tag.charAt(0) == 'c') {

            var groupController = new fabric.Group([elemento, text], {

                left: (144 * this.numHost),
                top: y,
                hasControls: false,
                hasBorders: false,
                transparentCorners: false,
                selectable: true,
                id: tag,
                connection: [], // Contiene todos los enlaces del grupo (son los mismos enlaces del elemento (connectionLine[])) 
                type: null
            });

            for (var i = 0; i < this.numHost; i++) {

                connection.type = "association";
                connection.elementOrigin = tag;
                connection.x2 = (this.numHost * 144) + 30; //punto del Controlador
                connection.y2 = y + 35;
                connection.x1 = ((i * 235) + 280); // punto del Switch
                connection.y1 = y + 225;
                connection.id = "a" + i;

                var link = this.makeLink([connection.x1, connection.y1, connection.x2, connection.y2], "controller");
                groupController.connection.push(link);

            }

            for (var i = 0; i < this.numHost; i++) {

                var line = groupController.connection[i];
                groupController.line = line;
                this.canvas.add(line);
                this.canvas.sendToBack(line);

            }

            this.canvas.add(groupController);
            this.tagController.push(tag);

            var tagLastSwitch = [];

            for (var i = this.tagSwitch.length - this.numHost; i < this.tagSwitch.length; i++) {

                tagLastSwitch.push(this.tagSwitch[i]);

            }

            this.canvas.forEachObject((obj)=> {

                for (var i = 0; i < groupController.connection.length; i++) {

                    var link = groupController.connection[i];

                    if (obj.id == tagLastSwitch[i]) {

                        obj.link = link;
                        obj.connection.push(link);

                    }
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
          // this.linkMaker(this.topologyType);

          // Insertar Elementos de Red Hosts
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

          this.canvas.forEachObject((obj) => {
            // Se toma el ultimo swtich agregado ya que este es el asociado a esta topologia
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
            objSwitch[s].position = "initial";
            objHost[s].state = "connected";
            objHost[s].position = "terminal";
            objSwitch[s].connection.push(link);
            objHost[s].connection.push(link);

            objSwitch[s].link = link;
            objHost[s].link = link;
            
            
            // SO IMPORTANT!!!!!
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
              value: this.tagHost[r],
              rX: posX[r],
              rY: pY + 80,
            };

            var objSw = {
              value: this.tagSwitch[r],
              rX: posX[r] + 90,
              rY: pY + 80,
            };

            this.netInfo.push(obj);
            h[r] = obj;

            this.netInfo.push(objSw);
            s[r] = objSw;
          }

          var pCX1 = this.netInfo.length * 68;

          // Inserta Switch y Host de la Topolgía Linear
          for (var a = 0; a < h.length; a++) {
            this.insertElementTopology(
              h[a].rX,
              h[a].rY,
              require("../assets/img/host.png"),
              "h" + (this.tagHost.length + 1),
              this.numHost,
              this.topologyType
            );
            this.insertElementTopology(
              s[a].rX,
              s[a].rY,
              require("../assets/img/openflow_switch.png"),
              "s" + (this.tagSwitch.length + 1),
              this.numHost,
              this.topologyType
            );
          }
          
          var port0Delete = "s" + (this.tagSwitch.length - this.numHost + 1);
          var port2Delete = "s" + this.tagSwitch.length;
          this.canvas.forEachObject((obj) =>{
            if (obj.elementContainer == port0Delete && obj.id == "eth0") {
              this.canvas.remove(obj);
              this.canvas.remove(obj.line);
            }
            if (obj.elementContainer == port2Delete && obj.id == "eth2") {
              this.canvas.remove(obj);
              this.canvas.remove(obj.line);
            }
          });
          //Inserta el Controller de la Topología Linear
          this.insertElementTopology(
            pCX1,
            pCY,
            require("../assets/img/controller.png"),
            "c" +(this.tagController.length + 1),
            this.numHost,
            this.topologyType
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
        for (var i = this.tagHost.length - this.numHost; i <= this.tagHost.length; i++) {
          id0.push("h" + (i + 1));
          this.canvas.forEachObject((obj)=> {
            if (obj.elementContainer && obj.elementContainer == id0[i - 1]) {
              if (obj.id == "eth0") {
                posX2.push(obj.connection[0].x2);
                posY2.push(obj.connection[0].y2);
                objHost.push(obj);
              }
            }
          });
        }

        for ( i = this.tagSwitch.length - this.numHost; i <= this.tagSwitch.length;i++
        ) {
          id1.push("s" + (i + 1));
          this.canvas.forEachObject((obj)=> {
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
          var link = this.makeLink([posX1[s], posY1[s], posX2[s], posY2[s]], "link");
          this.canvas.add(link);
          this.canvas.sendToBack(link);

          objSwitch[s].state = "connected";
          objSwitch[s].position = "initial";
          objHost[s].state = "connected";
          objHost[s].position = "terminal"
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
          var i = this.tagSwitch.length - this.numHost;
          i <= this.tagSwitch.length;
          i++
        ) {
          id0.push("s" + (i + 1));
          this.canvas.forEachObject((obj)=> {
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
        console.log(objSwitchAux[0]);

        for (
          var i = this.tagSwitch.length - this.numHost;
          i <= this.tagSwitch.length;
          i++
        ) {
          id1.push("s" + (i + 1));
          this.canvas.forEachObject((obj)=> {
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
          var link = this.makeLink([posX1[s], posY1[s], posX2[s], posY2[s]], "link");
          this.canvas.add(link);
          this.canvas.sendToBack(link);

          objSwitch[s].state = "connected";
          // objSwitch[s].position = "terminal"
          objSwitchAux[s].state = "connected";
          // objSwitchAux[s].position = "terminal"
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

    // Elimina el contenido del Canvas y Reinicia Variables
    newDocument(){
      this.canvas.clear();
      this.tagHost =[];
      this.tagSwitch= [];
      this.tagController = [];
      this.netInfo = [];
      this.link = [];
    },
    
    deleteObjects(activeObject){

      // Para la eliminacion de un elemento se tiene en cuenta el siguiente orden:
      // 1. Se eliminan (de tener) los enlaces, o asociaciones de controlador.
      // 2. Se eliminan (de tener) las asociaciones de puerto.
      // 3. Se elimina el elemento de Red.

      if(activeObject){
        // Si el elemento seleccionado es un Puerto
        if(activeObject.id.charAt(0) == 'e'){
          // Si el puerto tiene un enlace (state = connected) (se pone indice 1, porque esa es la asociacion con el Elemento de red (PortSwtich- PortHost))
          if(activeObject.connection.length > 1){
            activeObject.connection.forEach(cn => {
              if(cn.id === 'link'){
                // Se elimina visualmente en el Fabric
                this.canvas.remove(cn);
                // Se Elimina la relacion de conexion con el Puerto
                var i = activeObject.connection.indexOf(cn);
                activeObject.connection.splice(i,1);
                activeObject.state = '';
                // Identifica y Elimina la relacion con cualquier otro elemento del Canvas
                this.canvas.forEachObject(obj =>{
                  if(obj.connection){
                    obj.connection.forEach(con =>{
                      if(con === cn){
                        obj.state = '';                        
                        var i = obj.connection.indexOf(con);
                        obj.connection.splice(i,1);
                      }
                    });
                  }
                  
                });
              }
            });

          }
          // Si el puerto solo tiene la asociacion con el puerto
          else{
            // Se evita borrar el puerto por defecto de cualquier Elemento de Red
            if(activeObject.id != 'eth0'){ 
              this.canvas.remove(activeObject);
              var cn = activeObject.connection[0];
              this.canvas.remove(cn);
              this.canvas.forEachObject(obj =>{
                if(obj.connection){
                  // Identifica y elimina la relacion con otro elemento en el canvas
                  obj.connection.forEach(con =>{
                    if(cn === con ){
                      var i = obj.connection.indexOf(con); 
                      obj.connection.splice(i,1);
                    }
                  });
                }

              });
            }
          }
        }
        // Si el Elemento Seleccionado es un Host
        else if(activeObject.id.charAt(0) == 'h'){
          // Se Elimina el Host visualmente del Canvas
          this.canvas.remove(activeObject);
          activeObject.connection.forEach(cn =>{
            // Se Eliminan las asociaciones con Puertos visualmente del Canvas
            this.canvas.remove(cn);
          });
          this.canvas.forEachObject(obj =>{
            if(obj.elementContainer){
              // Se elimina lo asociado al puerto
              if(obj.elementContainer == activeObject.id){                
                this.deleteObjects(obj);
                // Se elimina visualmente el puerto del Canvas
                this.canvas.remove(obj);
              }
            }
          });
        }
        // Si el Elemento Seleccionado es un Switch
        else if(activeObject.id.charAt(0) == 's'){
          var connectionSize = activeObject.connection.length;
          var count = 0;
          activeObject.connection.forEach(cn =>{
            if(cn.id != 'controller'){
              count += 1; 
            };
          });
          // Si son iguales indica que solo asocianes de Puerto y no de Enlace
          if( count === connectionSize){
            this.canvas.remove(activeObject);
            activeObject.connection.forEach(cn =>{
              this.canvas.remove(cn);
            });
            this.canvas.forEachObject(obj =>{
            if(obj.elementContainer){
              // Se elimina lo asociado al puerto
              if(obj.elementContainer == activeObject.id){                
                this.deleteObjects(obj);
                // Se elimina visualmente el puerto del Canvas
                this.canvas.remove(obj);
              }
            }
          });
          }else{
            activeObject.connection.forEach(cn =>{
              if(cn.id === 'controller'){
                this.canvas.remove(cn);
                var i = activeObject.connection.indexOf(cn);
                activeObject.connection.splice(i,1);
                this.canvas.forEachObject(obj =>{
                  if(obj.connection){
                    obj.connection.forEach(con =>{
                      if(con === cn){
                        var i = obj.connection.indexOf(con);
                        obj.connection.splice(i,1);
                      }
                    });
                  }
                });
              }
            });
          }

            
            
            
            
            /*else if(cn.id === 'controller'){
              this.canvas.remove(cn);
              var i = activeObject.connection.indexOf(cn);
              activeObject.connection.splice(i,1);
              this.canvas.forEachObject(obj =>{
                if(obj.connection){
                  obj.connection.forEach(con =>{
                    if(con === cn){
                      var i = obj.connection.indexOf(con);
                      obj.connection.splice(i,1);
                    }
                  });
                }
              });
            }*/

          activeObject.connection.forEach(cn =>{
            
          });
        }
        // Si el Elemento Seleccionado es un Controlador
        else if(activeObject.id.charAt(0) == 'c'){
          if(activeObject.connection.length > 0){
            activeObject.connection.forEach(cn =>{
              this.canvas.remove(cn);
              var i = activeObject.connection.indexOf(cn);
              activeObject.connection.splice(i,1);
              this.canvas.forEachObject(obj =>{
                if(obj.connection){
                  obj.connection.forEach(con =>{
                    if(con === cn){
                      var i = obj.connection.indexOf(con);
                      obj.connection.splice(i,1);
                      obj.controller = '';
                    }
                  })
                }
              });
            })            
          }else{
            this.canvas.remove(activeObject);
            this.canvas.forEachObject(obj =>{
              if(obj.controller){
                if(obj.controller === activeObject.id){
                  obj.controller = '';
                }
              }
            })
          };
        };
      };
    },
    saveCanvas(){
      console.log(this.canvas);
      var currentCanvas = JSON.stringify(this.canvas); //Esta linea es de Prueba ya q la informacion de solo el canvas no es suficiente
      this.savedFabric = currentCanvas;
    },

    loadCanvas(){
      this.canvas.loadFromJSON(this.savedFabric);
      this.canvas.renderAll();
    },
  // Esta funcion no sirve
    llenarListaHost() {
      if (this.tagHost.length > 0) {
        for (var h = 0; h < this.tagHost.length; h++) {
          var temporal = {};
          temporal["id"] = String(this.tagHost[h]);
          this.listHost.push(temporal);
        }
      }
    },
    openInfoModal(id) {
      var info = {};
      if (id == "traffic") {
        this.infoModal = [];
        info["Valor"] = "Tipo de Trafico";
        info["Descripción"] =
          "Permite seleccionar el tipo de Protocolo del Tráfico que desea generar.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Tiempo de Emulación";
        info["Descripción"] =
          "El tiempo en segundos para transmitir el tráfico a generar. Iperf3 normalmente funciona enviando repetidamente una serie de longitud de bytes en tiempo determinado en segundos.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Número de Bytes";
        info["Descripción"] =
          "El número de búferes para transmitir. Normalmente, IPerf3 envía tráfico durante la cantidad de tiempo establecida. Esta opción anula esto y envía una matriz de longitud de bytes un número de veces, sin importar cuanto tiempo tome.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Tamaño del Paquete";
        info["Descripción"] =
          "La longitud de los búferes para leer o escribir. El valor predeterminado es 128 KB para TCP y 8 KB para UDP.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Tamaño de la Ventana Deslizante";
        info["Descripción"] =
          "Establece los tamaños del búfer del socket en el valor especificado. Para TCP, esto establece el tamaño de la ventana de TCP. (esto se envía al servidor y también se usa en ese lado).";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Ancho de Banda";
        info["Descripción"] =
          "Establezca el ancho de banda de destino en n bits / seg (predeterminado 1 Mbit / seg para UDP, ilimitado para TCP).";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Intervalo de Muestreo";
        info["Descripción"] =
          "Establece el intervalo de tiempo en segundos entre los informes periódicos de ancho de banda, fluctuación y pérdida. Si es distinto de cero, se realiza un informe cada segundo de intervalo del ancho de banda desde el último informe. Si es cero, no se imprimen informes periódicos. El valor predeterminado es cero.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Todos a Todos";
        info["Descripción"] =
          "Inicia el tráfico en un host sin esperar que acabe dicha ejecución inicia la ejecución en el siguiente host hasta culminar  el arreglo de la red.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Uno a uno";
        info["Descripción"] =
          "Inicia el tráfico en un host y espera que culmine este proceso e inicia el siguiente host hasta culminar el arreglo d l redacabe dicha ejecución inicia la ejecución en el siguiente host hasta culminar  el arreglo de la red.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Global";
        info["Descripción"] =
          "Modo de operación en el cual se genera tráfico simultaneo entre todos los host (Host en modo servidor y cliente).";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Especifico";
        info["Descripción"] =
          "Modo de operación en el cual se genera tráfico entre dos host especificos de la red (Host en modo servidor y cliente).";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Desde el Host:";
        info["Descripción"] =
          "Permite seleccinar el Host de origen para la generación de tráfico en el modo de operación especifico.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Al Host:";
        info["Descripción"] =
          "Permite seleccinar el Host de destino para la generación de tráfico en el modo de operación especifico.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Extremo a Extremo";
        info["Descripción"] =
          "Modo de operación en el cual se genera tráfico entre el primer host y el último host de la red (Host en modo servidor y cliente).";
        this.infoModal.push(info);
        this.$bvModal.show("modal-info");
      }
      if (id == "host") {
        this.infoModal = [];
        info["Valor"] = "Ruta por Defecto";
        info["Descripción"] =
          "Defina la direccion IP del Host. Por defecto, las Ips están configuradas semejantes a: 10.0.0.X.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Scheduler";
        info["Descripción"] =
          "Programador de red, o porgramador de paqutes, algoritmo de puesta en cola. Gestiona la secuencia de paquetes de red en las colas de transmision y recepción." +
          " CFS:Completely Fair Scheduler. Un algoritmo planificador desarrollado con el objetivo de maximizar el uso de la CPU con las diferentes tareas que se lanzan en un sistema Linux basándose en el Fair Queuing." +
          "RT: Real Time. Programación de tiempo real compuesto por el programador, el reloj y otros elementos hardware de procesamiento.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Límite CPU";
        info["Descripción"] =
          "Establece la capacidad de las frecuencias de trabajo del Host.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Núcleos CPU";
        info["Descripción"] =
          "Establece la cantidad de núcleos que tendrá el CPU del Host.";
        this.infoModal.push(info);
        this.$bvModal.show("modal-info");
      }
      if (id == "port") {
        this.infoModal = [];
        info["Valor"] = "Dirección IP";
        info["Descripción"] =
          "Conjunto de números que identifica, de manera lógica y jerárquica, a una interfaz en la red de un dispositivo que utilice el protocolo o, que corresponde al nivel de red del modelo TCP/IP.";
        this.$bvModal.show("modal-info");
      }
      if (id == "label") {
        this.infoModal = [];
        info["Valor"] = "Etiqueta";
        info["Descripción"] =
          "Rótulo o nombre que presenta información considerada relevante para un determinado elemento de red.";
        this.$bvModal.show("modal-info");
      }
      if (id == "switch") {
        this.infoModal = [];
        info["Valor"] = "Tipo";
        info["Descripción"] =
          "Permite seleccionar el tipo de dispositivo virtual encargado de la conexión de maquinas virtules y periféricos a la red con el fin de comunicarse entre sí y con otras redes." +
          "  IVS: Indigo Virtual Switch. Conmutador virtual OpenFlow puro diseñado para un alto rendimiento y una administración mínima. Está construido sobre la plataforma Indigo, que proporciona un núcleo común para muchos conmutadores virtuales." +
          "  Linux Brigde: Puente de Linux que se comporta como un conmutador de red, reenviando paquetes entre interfaces de red virtuales que están conectadas a él. Por lo general, se usa para reenviar paquetes en enrutadores virtuales, puertas de enlace o entre máquinas virtuales y espacios de nombres de red en un host." +
          "  OVS Bridge: Open vSwitch bridge. Puente diseñado para  comunicar un switch virtual en entornos de servidores virtualizados." +
          "  OVS: Open vSwitch. Software de código abierto, diseñado para ser utilizado como un switch virtual en entornos de servidores virtualizados. Es el encargado de reenviar el tráfico entre diferentes máquinas virtuales (VMs)." +
          "  User Switch.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "STP: Spanning Tree Protocol";
        info["Descripción"] =
          "Protocolo de red de capa 2 del modelo OSI, encargado de gestionar la presencia de bucles en topologías de red debido a la existencia de enlaces redundantes.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "STP Priority";
        info["Descripción"] =
          "Es un valor configurable encarado de establecer la prioridad del switch en un valor más pequeño que el del valor por defecto (32768), el nuevo valor debe ser múltiplo de 4096. Esto sólo se debe implementar cuando se tiene un conocimiento profundo del flujo de tráfico en la red.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Dirección IP";
        info["Descripción"] =
          "Conjunto de números que identifica, de manera lógica y jerárquica, a una interfaz en la red de un dispositivo que utilice el protocolo o, que corresponde al nivel de red del modelo TCP/IP.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "DPCTL Port";
        info["Descripción"] =
          "Puerto para la administración y control sobre el conmutador OpenFlow, mediante la agregación de flujos a la tabla de flujo, la consulta de las características y el estado del interruptor y el cambio de otras configuraciones. Por defecto es el 6633.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Protocolo";
        info["Descripción"] =
          "Sistema de reglas que permite a los controladores de red determinar la ruta de los paquetes de red a través de una red de conmutadores. El protocolo OpenFlow se establecio como la primera interfaz de comunicaciones estándar definida entre las capas de control y reenvío de una arquitectura SDN." +
          "   Versión Openflow 1.1." +
          "   Versión Openflow 1.2." +
          "   Versión Openflow 1.3." +
          "   Versión Openflow 1.4." +
          "   Versión Openflow 1.5.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Data Path";
        info["Descripción"] =
          "Ruta lógica para procesar los datos de entrada y generar los datos de salida correctos, generalmente se divide en bloques con el fin de ofrecer la optimización de la velocidad en el procesamiento de datos." +
          "   Kernel: Elemento principal de los sistemas Linux e interfaz fundamental entre el dispsitivo y sus procesos. Comunicandolos entre sí y gestiona los recursos de la manera más eficiente posible." +
          "   User.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Data Path ID";
        info["Descripción"] =
          "Identificador de ruta de datos, determinado por un número de 64 bits conformado por los 48 bits inferiores destinados a la dirección MAC del conmutador y los 16 bits superiores destinados al implementador.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Data Path Args";
        info["Descripción"] = "";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Modelo de Fallas";
        info["Descripción"] =
          "Determina una causa de falla o una posible manera en la que un sistema puede fallar." +
          "  Ninguno" +
          "  Secure" +
          "  Standalone";
        this.infoModal.push(info);
        this.$bvModal.show("modal-info");
      }
      if (id == "ipUser") {
        this.infoModal = [];
        info["Valor"] = "Dirección IP";
        info["Descripción"] =
          "Conjunto de números que identifica de manera lógica y jerárquica la interfaz de red del dispositivo local que utiliza como servidor Grafico.";
        this.$bvModal.show("modal-info");
      }
      if (id == "specific") {
        this.infoModal = [];
        info["Valor"] = "Selector de enlace";
        info["Descripción"] =
          "Permite seleccionar al host de detino que se encuentre conectado el Host de origen seleccionado.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Host Local";
        info["Descripción"] =
          "Dirección IP de origen del enlace de comunicación.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Puerto local";
        info["Descripción"] =
          "El puerto inicial del rango que se desea comunicar.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Dirección IP";
        info["Descripción"] =
          "Conjunto de números que identifica, de manera lógica y jerárquica, a una interfaz en la red de un dispositivo que utilice el protocolo o, que corresponde al nivel de red del modelo TCP/IP.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Host Remoto";
        info["Descripción"] =
          "Dirección IP de destino del enlace de comunicación.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Puerto Remoto";
        info["Descripción"] =
          "El puerto final del rango que se desea comunicar.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Omitido";
        info["Descripción"] = "";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Protocolo";
        info["Descripción"] =
          "Protocolos utilizados para enviar bits de datos, conocidos como paquetes, a través de Internet." +
          "   TCP-  Transfer Control Protocol:  Protocolo para el intercambio de datos de manera segura, requeriendo la autorización de conexión entre el emisor y el receptor, o el cliente y el servidor, antes de producirse la transferencia; una vez ambas partes hayan autorizado la transmisión, podrá iniciarse el envío y recepción de datos." +
          "   UDP - User Datagram Protocol: Protocolo del nivel de transporte basado en el intercambio de datagramas, que permite el envío de datagramas a través de la red sin que se haya establecido previamente una conexión";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Bytes Especificados Tx";
        info["Descripción"] =
          "Ancho de banda de destino en n bits / seg (predeterminado 1 Mbit / seg para UDP, ilimitado para TCP).";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Duración";
        info["Descripción"] = "Tiempo en segundos para transmitir.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Ventana Deslizante";
        info["Descripción"] =
          "Tamaños de búfer de socket en el valor especificado. Para TCP, esto establece el tamaño de la ventana de TCP. (esto se envía al servidor y también se usa en ese lado.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Bloques";
        info["Descripción"] = "Número de bloques (paquetes) para transmitir.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "TCP MSS";
        info["Descripción"] =
          "Tamaño máximo de segmento de TCP (MSS). El MSS suele ser el MTU - 40 bytes para el encabezado TCP / IP. Para Ethernet, el MSS es de 1460 bytes (MTU de 1500 bytes).";
        this.infoModal.push(info);
        
        this.$bvModal.show("modal-info");
      }
      if (id == "graffic") {
        this.infoModal = [];
        info["Valor"] = "Selector de funcionamiento";
        info["Descripción"] =
          "Permite seleccionar entre los modos de operación de los host (general, servidor y/o cliente), a fin de visualizar las métricas de desempeño de la red.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Métricas de desempeño";
        info["Descripción"] =
          "Refiere a las medidas de calidad de la red.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Modo de Operación";
        info["Descripción"] =
          "Refiere al modo de operación seleccionado por el usuario para el funcionamiento de la red.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Protocolo";
        info["Descripción"] =
          "Protocolos utilizados para enviar bits de datos, conocidos como paquetes, a través de Internet." +
          "   TCP-  Transfer Control Protocol:  Protocolo para el intercambio de datos de manera segura, requeriendo la autorización de conexión entre el emisor y el receptor, o el cliente y el servidor, antes de producirse la transferencia; una vez ambas partes hayan autorizado la transmisión, podrá iniciarse el envío y recepción de datos." +
          "   UDP - User Datagram Protocol: Protocolo del nivel de transporte basado en el intercambio de datagramas, que permite el envío de datagramas a través de la red sin que se haya establecido previamente una conexión";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Duración";
        info["Descripción"] = "Tiempo en segundos que dura la emulación.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Tamaño Bloque";
        info["Descripción"] =
          "Número de datos a transmitir.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Bloques";
        info["Descripción"] = "Número de paquetes para transmitir.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "TCP MSS";
        info["Descripción"] =
          "Tamaño máximo de segmento de TCP (MSS). El MSS suele ser el MTU - 40 bytes para el encabezado TCP / IP. Para Ethernet, el MSS es de 1460 bytes (MTU de 1500 bytes).";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Buffer Envió";
        info["Descripción"] =
          "Espacio reservado para el almacenamiento de los datos de envió.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Buffer Recepción";
        info["Descripción"] =
          "Espacio reservado para el almacenamiento de los datos de recepción.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Total Bytes";
        info["Descripción"] =
          "Bytes transmitidos.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Prom Total Bytes";
        info["Descripción"] = "Promedio Bytes transmitidos.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Prom Bit por Seg";
        info["Descripción"] = "Promedio del ancho de banda de destino en n bits / seg (predeterminado 1 Mbit / seg para UDP, ilimitado para TCP).";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Prom SND CWND";
        info["Descripción"] =
          "Promedio del tamaño de la ventana de congestión.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Prom RTT";
        info["Descripción"] =
          "(Round Trip Time) - Promedio del tiempo en que tarda un paquete de dats enviado dede un emisor en volver a este mismo emisor habiendo pasado por el receptor del destino.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Prom R-Tx";
        info["Descripción"] =
          "Promedio de pauetes retransmitidos.";
        this.infoModal.push(info);
        
        info = {};
        info["Valor"] = "Prom RTTVAR";
        info["Descripción"] =
          "(Round Trip Time Variation) - Promedio de la variación del tiempo en que tarda un paquete de dats enviado dede un emisor en volver a este mismo emisor habiendo pasado por el receptor del destino.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Prom PMTU";
        info["Descripción"] =
          "(Path Maximum Transmission) - Promedio maximo de la unidad de tranmisión en la ruta de red entre 2 host.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Medidas solo para el protocolo UDP";
        info["Descripción"] =
          "El jitter y los paquetes son solo para UDP.";
        this.infoModal.push(info);

        info = {};
        info["Valor"] = "Jitter";
        info["Descripción"] =
          "Variación en el tiempo en la llegada de los paquetes, causada por congestión de red, perdida de sincronización o por las diferentes rutas seguidas por los paquetes para llegar al destino.";
        this.infoModal.push(info);
         
        info = {};
        info["Valor"] = "Paquetes";
        info["Descripción"] =
          "Cada uno de los bloques en que se divide la información para enviar, en el nivel de red.";
        this.infoModal.push(info);
        
        this.$bvModal.show("modal-info");
      }
      if (id == "controller") {
        this.infoModal = [];
        info["Valor"] = "Tipo";
        info["Descripción"] =
          "Permite seleccionar la entidad lógica de control (Controlador SDN) encargada de traducir las peticiones de las aplicaciones a las rutas de datos, dando a la capa de aplicación una visión abstracta de la red mediante estadísticas y posibles eventos.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "OpenFlow Reference Implementation:";
        info["Descripción"] =
          "Controlador software OpenFlow lógicamente centralizado que permite modificar el comportamiento de los dispositivos de red a través de un conjunto de instrucciones de reenvío definidas.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "NOX:";
        info["Descripción"] =
          "Plataforma de control de red, que proporciona una interfaz programática de alto nivel para la gestión y el desarrollo de aplicaciones de control de red.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "OVS: Open vSwitch Controller.";
        info["Descripción"] =
          "Software de código abierto, diseñado para ser utilizado como un switch virtual en entornos de servidores virtualizados. Es el encargado de reenviar el tráfico entre diferentes máquinas virtuales (VMs) en el mismo host físico y también reenviar el tráfico entre las máquinas virtuales y la red física.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "ODL: OpenDayLight  Controller.";
        info["Descripción"] =
          " Proyecto colaborativo de código abierto, que implementa una plataforma para la creación de redes definidas por software para la supervisión de dispositivos de red abierta y centralizada.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Dirección IP";
        info["Descripción"] =
          "Conjunto de números que identifica, de manera lógica y jerárquica, a una interfaz en la red de un dispositivo que utilice el protocolo o, que corresponde al nivel de red del modelo TCP/IP.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Puerto";
        info["Descripción"] =
          "Interfaz virtual a través de la cual se pueden enviar y recibir los diferentes tipos de datos.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Protocolo";
        info["Descripción"] =
          "Sistema de reglas que permiten que dos o más entidades de un sistema de comunicación se comuniquen entre ellas para transmitir información.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "TCP: Transmission Control Protocol.";
        info["Descripción"] =
          "Protocolo de control de transmisión orientado a conexión, es decir, los datos pueden enviarse de forma bidireccional una vez establecida la conexión.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "SSL: Secure Sockets Layer.";
        info["Descripción"] =
          "Protocolo para navegadores y servidores web que permite autenticar, cifrar y descifrar la información enviada a través de Internet.";
        this.infoModal.push(info);
        this.$bvModal.show("modal-info");
      }
      if (id == "error") {
        this.infoModal = [];
        info["Valor"] = "Failed to delete links";
        info["Descripción"] =
          "Al terminar la emulación es imposible eliminar los enlaces de la topología creada. Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to stop MiniNet";
        info["Descripción"] =
          "Error al detener la emulación de la topología MiniNet. Si el error persiste, reinicie el servidor de MiniNet.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to send response";
        info["Descripción"] =
          "Error de comunicación entre el servidor de MiniNet y la aplicación. Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to generate network";
        info["Descripción"] =
          "Error al intentar emular la red en MiniNet. Puede que este servicio este ocupado en este momento, si esta emulando una red, primero deteng la emulación (boton detener - barra de herraientas). Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Memory limit reached";
        info["Descripción"] =
          "Esto ocurre al alcanzar el limiete de memoría sugerido en el servidor de MiniNet, suele deverse a una topología muy grande o parametros de generación muy altos que con lleven a procesos de generación de alto renimiento o procesaminto de datos. Intente validar los parmetros de la red nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to reload Iperf3";
        info["Descripción"] =
          "Error al reiniciar el generador de tráfico Iperf3. Intentelo nuevamente. Si el error persiste, reinicie el servidor de MiniNet. ";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to create servers";
        info["Descripción"] =
          "Error al levantar los host en modo servidor en el generador de tráfico. Si el error persiste, reinicie el servidor de MiniNet.";
        this.infoModal.push(info);
        info["Valor"] = "Failed to create client";
        info["Descripción"] =
          "Error al levantar los host en modo cliente en el generador de tráfico. Si el error persiste, reinicie el servidor de MiniNet.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Bad excecution";
        info["Descripción"] =
          "Error al establecer el servidor de generación de tráfico correctamente. Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to create traffic";
        info["Descripción"] =
          "Error al generar el tráfico de la red en el arreglo dado. Esto se debe a una topología demasiado grande con parámetros de generación de tráfico no soportados por la capacidad del servidor de MiniNet.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to read client traffic";
        info["Descripción"] =
          "Error en la lectura de la respuesta del generador de tráfico en el host cliente. Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to read server traffic";
        info["Descripción"] =
          "Error en la lectura de la respuesta del generador de tráfico en el host server. Intente nuevamente.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to generator output server traffic";
        info["Descripción"] =
          "Error en la generación de la respuesta del host servidor en la generación del tráfico.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Failed to generator output client traffic";
        info["Descripción"] =
          "Error en la generación de la respuesta del host client en la generación del tráfico.";
        this.infoModal.push(info);
        info = {};
        info["Valor"] = "Response collapsed";
        info["Descripción"] =
          "La respuesta del servidor de MiniNet supera la capacidad de envió.";
        this.infoModal.push(info);
        this.$bvModal.show("modal-info");
      }
    },
  },

  computed: {
    //Obtiene la Herramienta seleccionada en el panel lateral izquierdo de elementos de red
    obtenerHerramienta() {
      this.actualTool = this.herramienta;
      console.log(this.actualTool);
      return this.actualTool;
    },
    //En el Modal de Trafico identifica el modo de traffico seleccionado y habilita la seleccion de host en el modo especifico
    specifficTrafficMode() {
      if (this.trafficModeSelected == "global") {
        
        return this.selHostS;
        
      }
      if (this.trafficModeSelected == "xtreme") {
        return this.selHostS;
        
      }
      if (this.trafficModeSelected == "specific") {
        return !this.selHostS;
      }
    },

    traficDistribution(){
       if (this.trafficModeSelected == "global") {
        
        return !this.selHostG;
        
      }
      if (this.trafficModeSelected == "xtreme") {
        return this.selHostG;
        
      }
      if (this.trafficModeSelected == "specific") {
        return this.selHostG;
      }
    },
    optionCheckerTime(){
      if (this.radioTime == 't'){
          this.radioPacket = '';
          this.radioKPacket = '';
          this.textPacket = '';
          return this.checkerTime;
      }else{
        this.stateTime = null;
        return !this.checkerTime;
      }
      
      
    },
    optionCheckerPacket(){
      if (this.radioPacket == 'n'){
        this.radioTime = '';
        this.radioKPacket = 'K';
        this.stateTime = null;
        this.textTime = '';
        return this.checkerPacket;
      }else{  
        this.radioPacket = '';
        this.statePacket = null;
        return !this.checkerPacket;
      }

    },
    optionCheckerWindow(){
      if (this.valueWindow == 'w'){
          this.radioWindow = 'K';
          return this.checkerWindow;
      }else{
        this.radioWindow = '';
        this.textWindow = '';
        this.stateWindow = null;
        return !this.checkerWindow;
      } 
    },
    optionCheckerLong(){
      if (this.valueLong == 'l'){
          this.radioLong = 'K';
          return this.checkerLong;
      }else{
        this.radioLong = '';
        this.textLong = '';
        this.stateLong = null;
        return !this.checkerLong;
      } 
    },
    optionCheckerBw(){
      if (this.valueBw == 'b'){
          this.radioBw = 'K';
          return this.checkerBw;
      }else{
        this.radioBw = '';
        this.textBw = '';
        this.stateBw = null;
        return !this.checkerBw;
      } 
    },
    optionCheckerInterval(){
      if (this.valueInterval == 'i'){
          
          return this.checkerInverval;
      }else{
        this.radioBw = '';
        this.textInterval = '';
        this.stateInterval = null;
        return !this.checkerInterval;
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
</style>
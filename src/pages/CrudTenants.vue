<template>
	<div class="grid crud-demo">
		<div class="col-12">
			<div class="card">
				<Toast/>
				<Toolbar class="mb-4">
					<template v-slot:left>
						<div class="my-2">
							<Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedEntitys || !selectedEntitys.length" />
						</div>
					</template>

					<template v-slot:right>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template>
				</Toolbar>
				<DataTable ref="dt" :value="entitys" v-model:selection="selectedEntitys" dataKey="id" :paginator="true" :rows="10" :filters="filters"
							paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
							currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entitys" responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Administrar Tenants</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global']" placeholder="Search..." />
                            </span>
						</div>
					</template>
					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<Column field="name" header="Name" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Name</span>
							{{slotProps.data.name}}
						</template>
					</Column>					
					<Column field="type" header="Type" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Type</span>
							{{slotProps.data.type}}
						</template>
					</Column>
					<Column field="address1" header="Address1" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Address</span>
							{{slotProps.data.address1}}
						</template>
					</Column>
					<Column field="city" header="City" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">City</span>
							{{slotProps.data.city}}
						</template>
					</Column>	
					<Column field="status" header="status" :sortable="true">
						<template #body="slotProps">
							<span class="p-column-title">Estado</span>
							{{slotProps.data.status}}
						</template>
					</Column>		
					<Column>
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editEntity(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteEntity(slotProps.data)" />
						</template>
					</Column>				
					
				</DataTable>
				<Dialog v-model:visible="entityDialog" :style="{width: '450px'}" header="Información Tenans" :modal="true" class="p-fluid">
						<div class="field">
						<label for="name">Nombre</label>
						<InputText id="name" v-model.trim="entity.name" required="true" autofocus :class="{'p-invalid': submitted && !entity.name}" />
						<small class="p-invalid" v-if="submitted && !entity.name">Name es requerido.</small>
					</div>
					<div class="field">
						<label for="tipo">Tipo</label>
						<InputText id="name" v-model.trim="entity.type" required="true" />
						<small class="p-invalid" v-if="submitted && !entity.type">Tipo es requerido.</small>
					</div>					
					<div class="formgrid grid">
						<div class="field col">
							<label for="name">Dirección</label>
							<InputText id="name" v-model="entity.address1" />
						</div>
						<div class="field col">
							<label for="type">Ciudad</label>
							<InputText id="type" v-model="entity.city" />
						</div>
					</div>
					<template #footer>
						<Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveEntity" />
					</template>
				</Dialog>
				<Dialog v-model:visible="deleteEntityDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="entity">Desea eliminar un Usuario <b>{{entity.name}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEntityDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteEntity" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteEntitysDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="entity">Are you sure you want to delete the selected products?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteEntitysDialog = false"/>
						<Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteSelectedEntitys" />
					</template>
				</Dialog>	
			</div>
		</div>
	</div>

</template>

<script>
import TenantService from '../service/TenantService';

export default {
	data() {
		return {
			entitys: null,
			entityDialog: false,
			deleteEntityDialog: false,
			deleteEntitysDialog: false,
			entity: {},
			selectedEntitys: null,
			filters: {},
			submitted: false,
			statuses: [
				{label: 'INSTOCK', value: 'instock'},
				{label: 'LOWSTOCK', value: 'lowstock'},
				{label: 'OUTOFSTOCK', value: 'outofstock'}
			]
		}
	},
	tenantService: null,
	created() {
		this.tenantService = new TenantService();
	},
	mounted() { 
		//this.tenantService.getTenants().then(data => this.entitys = data);
		this.loadEntitys();
	},
	methods: {		
		openNew() {
			this.entity = {};
			this.submitted = false;
			this.entityDialog = true;
		},
		hideDialog() {
			this.entityDialog = false;
			this.submitted = false;
		},
		saveEntity() {
			this.submitted = true;
			if (this.entity.name.trim()) {
				if (this.entity.id) {
					console.log("Tiene id");
					this.entity.status= "active";					
					this.tenantService.updateTenant(this.entity).then(()=>{
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Tenant Actualizado', life: 3000});
					}).catch((data)=>{
						console.log(data.error);
						this.$toast.add({severity:'error', summary: 'Error Actualizando', detail: 'Error Tenant Actualizado', life: 3000});	
					});
					this.loadEntitys();
				}else{					
					this.entity.status="active";
					this.tenantService.createdTenant(this.entity).then(()=>{
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Tenant Creado con exito', life: 3000});
					}).catch((data)=>{
						console.log(data);
						this.$toast.add({severity:'error', summary: 'Error Creando ', detail: 'Error al creal el Tenant', life: 3000});	
					});
				this.loadEntitys();
				}	
			}
			this.entityDialog = false;
			this.entity = {};
							
		},
		editEntity(entity){				
        this.entity = {...this.deleteAttribNull(entity)};
			this.entityDialog = true;
		},
		confirmDeleteEntity(entity) {
			this.entity = entity;
			this.deleteEntityDialog = true;			
		},
		deleteEntity() {
			this.tenantService.deleteTenant(this.entity).then(()=>{
					this.$toast.add({severity:'success', summary: 'Successful', detail: 'Tenant Eliminado', life: 3000});
						this.loadEntitys();
					}).catch(()=>{						
						this.$toast.add({severity:'error', summary: 'Error Eliminando ', detail: 'Error Tenant Actualizado', life: 3000});	
					})
			this.deleteEntityDialog = false;
			this.entity = {};
			
		},		
		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			this.deleteEntitysDialog = true;
		},
		deleteSelectedEntity() {
			this.entitys = this.entitys.filter(val => !this.selectedEntitys.includes(val));
			this.deleteEntitysDialog = false;
			this.selectedentitys = null;
			this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
		},
		loadEntitys(){
			this.tenantService.getTenants().then(data => this.entitys = data);
		},
		deleteAttribNull(entity){
			Object.keys(entity).forEach(key => {
                    if (entity[key] === null) delete entity[key];
                 }); 
			return entity;	 
		}
	}
}
</script>

<style scoped lang="scss">
	.product-badge {
		border-radius: 2px;
		padding: .25em .5rem;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
		letter-spacing: .3px;

		&.status-instock {
			background: #C8E6C9;
			color: #256029;
		}

		&.status-outofstock {
			background: #FFCDD2;
			color: #C63737;
		}

		&.status-lowstock {
			background: #FEEDAF;
			color: #8A5340;
		}
	}
</style>

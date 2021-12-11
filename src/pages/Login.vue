<template>
	<div class="grid">
		<div class="col-12 md:col-6">
			<div class="card p-fluid">
				<h5>Horizontal</h5>
				<div class="field grid">
					<label for="name3" class="col-12 mb-2 md:col-2 md:mb-0">Name</label>
					<div class="col-12 md:col-10">
						<InputText id="name3" type="text" />
					</div>
				</div>
				<div class="field grid">
					<label for="email3" class="col-12 mb-2 md:col-2 md:mb-0">Email</label>
					<div class="col-12 md:col-10">
						<InputText id="email3" type="text" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dropdownItems: [
					{name: 'Option 1', code: 'Option 1'},
					{name: 'Option 2', code: 'Option 2'},
					{name: 'Option 3', code: 'Option 3'}
				],
				dropdownItem: null
			}
		}
	}
</script>

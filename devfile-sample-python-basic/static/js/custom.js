$(document).ready(function(){
  $("#info").modal("hide");
  $("#about").click(function(){
    $("#info").modal("show");
  });
  
var table = $('#biCatalog').DataTable({
		paging: false,
		searching: true,
		columnDefs: [ 
			{ orderable: false, targets: [6,7,8] },
			{ render: function ( data, type, row ) { 
					switch (data) {
						case 'dashboard':
							return 'Cruscotto';
						case 'report':
							return 'Report';
						case 'kpi':
							return 'KPI/Indicatore';
						case 'application':
							return 'Applicazione BI';
						case 'hybrid':
							return 'Ibrido';
						default:
							return 'Non Disponibile'; 
					}
			   },
			   targets: 2
			},
			{ render: function ( data, type, row ) { 
					switch (data) {
						case "200":
							return 'Accessibile';
						case "403":
							return 'Non Autorizzato';
						case "404":
							return 'Non Raggiungibile';
						case "500":
							return 'Server Error';
						default:
							return 'Non Disponibile';
					}
			   },
			   targets: 3
			},
			{ render: function ( data, type, row ) { 
					switch (data) {
						case "acquisti":
							return 'Acquisti';
						case "amministrazione_contabilita":
							return 'Amministrazione e Contabilità';
						case "comunicazione":
							return 'Comunicazione e Relazioni Istituzionali';
						case "rapporto_assicurativo":
							return 'Costituzione e Gestione del Rapporto Assicurativo';
						case "legale":
							return 'Legale';
						case "mds":
							return 'MDS';
						case "organizzazione_digitale":
							return 'Organizzazione Digitale e Sistemi Informativi';
						case "patrimonio":
							return 'Patrimonio';
						case "pianificazione_controllo":
							return 'Pianificazione e Controllo';
						case "prestazioni":
							return 'Prestazioni';
						case "prevenzione":
							return 'Prevenzione';
						case "ricerca":
							return 'Ricerca';
						case "risorse_umane":
							return 'Risorse Umane';
						case "sanitaria_riabilitazione":
							return 'Sanitaria e Riabilitazione';
					    case "":
							return '';
						default:
							return 'Non Disponibile';
					}
			   },
			   targets: 5
			},			
		],
		//orderCellsTop: true,
	        fixedHeader: true,
		bInfo : true,
		dom: "<'row filterbar'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'f>>tp",
		language: {
			search: "Cerca...",
			zeroRecords : "Nessun record corrispondente al filtro inserito",
			info: "Visualizzati _TOTAL_ di _MAX_ records",
			infoEmpty: "Nessun record",
			infoFiltered: " (con filtro applicato)"
		}
	});
  $('.dataTables_length').addClass('bs-select');

var customFilters = '<div id="customFilters" class="row">'+
                   '<div class="col-sm-12 col-md-6 align-self-start"><div class="dataTables_info">Filtra per:</div></div>'+
                   '<div class="col-sm-12 col-md-6 row"><div id="filterTipoWrap" class="col-sm-12 col-md-6"></div>'+
                   '<div id="filterStatoWrap" class="col-sm-12 col-md-6 "></div>'+
                   '</div>'   ;
$(customFilters).insertAfter('.filterbar');	
$('#filterTipoWrap').html('<select id="filter_type_obj" class="custom-select" style="margin-left: 40px;color: #000080 !important;border-color: #000080 !important;"><option value="Cruscotto">Cruscotto</option><option value="Report" >Report</option>'+
'<option value="KPI/Indicatore"  >KPI/Indicatore</option><option value="Applicazione BI" >Applicazione BI</option><option value="Ibrido">Ibrido</option>'+
'<option value="Non Disponibile">Non Disponibile</option><option value="" selected="selected">--Tipo Oggetto--</option></select>');
$('#filterStatoWrap').html('<select id="filter_status" class="custom-select" style="margin-left: 30px;color: #000080 !important;border-color: #000080 !important;"><option value="Accessibile" >200 - Accessibile</option>'+
'<option value="Non Autorizzato" >403 - Non Autorizzato</option><option value="Non Raggiungibile" >404 - Non Raggiungibile</option>'+
'<option value="Server Error" >500 - Server Error</option><option value="Non Disponibile">Non Definito</option>'+
'<option value="" selected="selected" >--Stato--</option></select>');


/*
    $('#biCatalog thead tr').clone(true).appendTo( '#biCatalog thead' );
    $('#biCatalog thead tr:eq(1) th').each( function (i) {
        var title = $(this).text();
	if (title != 'Azioni' || title != '' ) {
	$(this).removeClass('sortable both sorting sorting_asc sorting_desc')
        $(this).html( '<input type="text" placeholder="Filtra '+title+'" />' );
 
        $( 'input', this ).on( 'keyup change', function () {
            if ( table.column(i).search() !== this.value ) {
                table
                    .column(i)
                    .search( this.value )
                    .draw();
            }
        } );
	}
    } );
*/
 $('#filter_type_obj').on( 'change', function () {
	if ( table.column(2).search() !== this.value ) {
		table
			.column(2)
			.search( this.value )
			.draw();
	}
} );

$('#filter_status').on( ' change', function () {
	if ( table.column(3).search() !== this.value ) {
		table
			.column(3)
			.search( this.value )
			.draw();
	}
} );
$('#_desc_users_profile').selectpicker({
	actionsBox: true,
	noneSelectedText: "Nessuna selezione",
	noneResultsText: "Nessuna opzione per filtro",
	selectAllText: "Seleziona tutti",
	deselectAllText: "Deseleziona tutti",
	countSelectedText: "{0} profili selezionati",
	//liveSearch: true,
	//selectedTextFormat: "count",
});

$("#_desc_users_profile").on('changed.bs.select', function () {
    var options = $('#_desc_users_profile option:selected');
	var values = [];
    $(options).each(function(){
		values.push($(this).attr('value'));
    });
	selVal = values.join(',');
	inClone = '#'+$(this).attr('id').substring(1);
	$(inClone).val(selVal);
	console.log('STAMPO VALORE CAMPO: ' + $(inClone).val());
});

  $("select.custom-select.new-rec").each(function(){
    selVal = $(this).children("option:selected").val();
	inClone = '#'+$(this).attr('id').substring(1);
	$(inClone).val(selVal)
  });
  $("select.custom-select.new-rec").change(function(){
    selVal = $(this).children("option:selected").val();
	inClone = '#'+$(this).attr('id').substring(1);
	$(inClone).val(selVal)
  });

  
});

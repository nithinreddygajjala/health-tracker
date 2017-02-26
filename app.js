var global;
var k=false;
//var total=0;
var model=Backbone.Model.extend({

  defaults:{
    name:'',
    cal:'',
    fat:'',
    id:'',
    cname:'',
    id1:'',
    localStorage: new Backbone.LocalStorage('selectedFoods-backbone'),

  }

});

var collection=Backbone.Collection.extend({
  model:model
});

var selcol=Backbone.Collection.extend({
  model:model,
  defaults:{
    date:''
  }
//localStorage: new Backbone.LocalStorage('selectedFoods-backbone'),

});

var c1=new collection();
var sel=new selcol();

var collectionview=Backbone.View.extend({
  initialize:function(){
    this.render();
  //  console.log(this.el);
  },
  render:function(){
    var self=this;
    self.$el.empty();
    this.model.each(function(data){
//      console.log(data);
    //console.log(data.id);
  self.$el.append("</br> <button class='btn btn-default' id="+data.attributes.id+"> add</button>"+data.attributes.name +" cal : "+data.attributes.cal +' from '+data.attributes.cname );
});
  },
events:{
'click ':'add'
},
 add:function(x){



  console.log(x);
  var lees = this.model.where({ id:x.target.id });
  var tm=new model({name:lees[0].attributes.name,cname:lees[0].attributes.cname,cal:lees[0].attributes.cal,fat:lees[0].attributes.fat,id:Math.random().toString(10)});
  //console.log(tm);
  sel.add([tm]);
  var selv1=new selview({el:'#select',model:sel});

  //console.log(sel);
  //var x= new finalcol();
  //x.save({name:'fish'});
  //this.$el.undelegate('button', 'click');
  //console.log(sel);
}
});



var view=Backbone.View.extend({

  initialize:function(){

    this.render();


    },
  render:function(){
  //console.log(this);
  this.$el.html(" <br><button  class='btn btn-default'> Search</button> ");

},
events:{
'click ':'get',
},
get:function(){

  var skey=$('#search').val();
  $('#search').val('');
  //console.log(skey);

  $.get('https://api.nutritionix.com/v1_1/search/' + skey + '?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=79638cff&appKey=a7129008b91c0ae9412ae2316564d518', function(data, status){

      c1.reset();
        for(var i=0;i<data.hits.length;i++){
          //console.log(data.hits[i].fields);

          var temp=new model({name:data.hits[i].fields.item_name,id:data.hits[i].fields.item_id,cal:data.hits[i].fields.nf_calories,fat:data.hits[i].fields.nf_total_fat,cname:data.hits[i].fields.brand_name});
          //console.log(temp);

          c1.add([temp]);

        }
        //cview.undelegateEvents()

        if(k){
          global.undelegateEvents();
        }

var cview=new collectionview({el:'#result',model:c1});
global=cview;
k=true;

    });

}
});

var v1=new view({el:$("#container")});
//v1.undelegateEvents();
var selview=Backbone.View.extend({
  initialize:function(){
    //console.log(this.model);
    this.render();
  },
  render:function(){
    //console.log('enetered');
    var self=this;
    //this.$el.html('welcome');
    self.$el.empty();
    this.model.each(function(data){
      //console.log(data);
    //  console.log(data.id);
  self.$el.append("</br> <button class='btn btn-default' id="+data.attributes.id+"> Remove</button>"+data.attributes.name +" cal : "+data.attributes.cal +' from '+data.attributes.cname);


});
},
events:{
  'click':'remove'
},
remove:function(e){
  //console.log(e.target.id);
  this.$el.empty();


  this.model.remove([{ id:e.target.id }]);
  var self=this;
  this.model.each(function(data){
    //console.log(data);
  //  console.log(data.id);
self.$el.append("</br> <button class='btn btn-default' id="+data.attributes.id+"> Remove</button>"+data.attributes.name +" cal : "+data.attributes.cal +' from '+data.attributes.cname);


});
}

});

//console.log(sel);

var tcalview=Backbone.View.extend({
  initialize:function(){
    //this.render();
  },
  render:function(){
    var self=this;
    var total=0;
    this.model.each(function(data){
      //console.log(data);
    //  console.log(data.id);

    total=total+data.attributes.cal;


    });
    this.$el.empty();
    this.$el.append("<h3>the total calories "+total+"</h3>");
//console.log(this.$el);
  }
});
//console.log(c1);
var obj=new tcalview({el:'#tcal',model:sel});

sel.bind("all", function(data) {
  //console.log(data);
  if(data=='remove'||data=="update")
obj.render();

});
var globaldate=null;
$(function() {
            $( "#datepicker-2" ).datepicker({
                onSelect: function (dateText, inst) {
                    var date = $(this).val();
                    //console.log(date);
                    globaldate=date;
                      $('#cdate').empty();
                      $('#ren').empty();
                        $('#status').empty();
                    $('#cdate').append(date);

                    //var t=new ts(el:'$tr',l.)
                    //console.log(l.models);

                    var temp;
                      var model=new finalmodel();
                      var i=0;
                    l.each(function(data){
                      //console.log(data.attributes.data);
                      //console.log(l);
                      if(((data.attributes.date)==globaldate)&&(i==0))
                      {
                      temp=data.attributes;

                      //console.log(data.attributes);

                        //  var v=new ts({el:'#ts',model:data.attributes.data});


                      }

                    });

                    //console.log(temp);
                    if(temp==undefined){
                      $('#ts').empty();
                      //$('#ts').append('please select some data');
                    }
                    else {
                      var v= new ts({el:'#ts',model:temp});
                      var k= new vren({el:'#ren',model:temp});
                    }


                }
            });
});

var finalmodel=Backbone.Model.extend({

    date:'12/12/12',
    data:'please select'

});
var finalcol=Backbone.Collection.extend({
model:finalmodel,
//localStorage: new Backbone.LocalStorage('selectedFoods-backbone'),
});

var l=new finalcol();

var vren=Backbone.View.extend({
  initialize:function(){
    var self=this;
    console.log(this.model.cur.length);

    this.$el.empty();

    for(i=0;i<this.model.cur.length;i++){
      self.$el.append(this.model[i].name+'cal : '+this.model.cur[i].cal+'</br> from : '+this.model.cur[i].cname);
        //console.log(this.model);
    }

  }
});
var vrens=Backbone.View.extend({
  initialize:function(){
    var self=this;
    console.log(this.model[0]);

    this.$el.empty();

    for(i=0;i<this.model.length;i++){
      self.$el.append('</br> '+this.model[i].name+' from : '+this.model[i].cname+' cal : '+this.model[i].cal);
        //console.log(this.model);
    }

  }
});
var ts=  Backbone.View.extend({
  initialize:function(){
    this.render();

  },
  render:function(){
    //var self=this;
    //var total=0;

      this.$el.empty();
      console.log(this.model);

      this.$el.append(this.model.data);
    }
    //this.model.each(function(data){
      //console.log(data);
    //  console.log(data.id);

    //total=total+data.attributes.cal;


    //});


});
$('#save').click(function(){

  console.log('save on :' +globaldate);
    $('#status').empty();
  $('#status').append("data saved");
  console.log('data saved');
  console.log(this.$el);
  if(globaldate==null){
    console.log('please select the date');

  }
  else{

    var self=this;
    var total=0;
    sel.each(function(data){
      //console.log(data);
    //  console.log(data.id);

    total=total+data.attributes.cal;


    });



var k=sel.toJSON();
//console.log(k);

  var model=new finalmodel({date:globaldate,data:total,cur:k});
  var model1=new finalmodel();
  //l.add([model1]);
  var i=0;


//l.add([model1]);
l.add([model]);
  //console.log(l);

var k= new vrens({el:'#ren',model:k});





}




});
//l.save([sel]);


//t.add([sel]);

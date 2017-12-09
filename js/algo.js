

	//L'objet sommet
		 class noeud {
			   constructor (name, children) {
			    this.name = name;
			    this.children = children;
			  }
			 
			  getName () {
			    return this.name;
			  }
			 
			  getchildren () {
			    return this.children;
			  }

			  setName (name) {
			    this.name=name;
			  }
			 
			  setchildren (child) {
			    this.children.push.apply(this.children,child);
			  }
		}

       function include(arr,obj) {
			    return (arr.indexOf(obj) != -1);
			}


		function dfs(sous_graph,marq){
					var stack=[];
					stack.push(sous_graph);
			        while (0<stack.length) {
						var v=stack.splice(0,1);	
						if (!include(marq,v[0])) 
							{
								marq.push(v[0])
							}
							//console.log(v[0]);
				         	v[0].children.forEach(function(element) {
				         	   if (!include(marq,element))	
							        stack.push(element);
							});
							
				   }
				}




			function isBiconnected(noeud){
				//Get rid of noeud from its child's childs !
				filsNoeud=[];
				noeud.children.forEach(function(element) {
						var indexFather=element.children.indexOf(noeud);
						element.children.splice(indexFather, 1);
						filsNoeud.push(element);
						});
				marq=[];    //Global visited elements table
				filsNoeud.forEach( function(ele) {
					marql=[];  //Local visited elements table
					dfs(ele,marql);
					var isContained=false;
					marql.every( function(element){
						marq.every(function(marqi){
						  if(include(marqi,element)){
						  	marqi.push.apply(marqi, marql);  //copy all marq of this son in marq[i]
						  	isContained=true;
						  	return true ;
						  }
					  });
						if (isContained) return true;
					});
					if (!isContained){marq.push(marql);}   //put all marq of this son a new marq[i]
				});

				if (1<marq.length) {
					filsNoeud.forEach(function(ele) {
						ele.children.push(noeud);  //Put noeud in its children's children
					});
					return true;
				}else {
					filsNoeud.forEach(function(ele) {
						ele.children.push(noeud); //Put noeud in its children's children
					});
					return false;
				}
			}

			function get_biconnected(components){
				var list=[];
				components.forEach(function(component) {
						if (isBiconnected(component))
						     list.push(component);
					});
				return list;
			}

    let f4=new noeud("f4",[]);
    let f6=new noeud("f6",[]);	
	let f5=new noeud("f5",[]);
	let f1=new noeud("f1",[]);
    let f3=new noeud("f3",[]);	
	let f2=new noeud("f2",[]);
	let sommet1=new noeud("a",[f2,f1,f5]);
	let sommet2=new noeud("b",[f3]);
	f1["children"].push(sommet1);
	f2["children"].push(sommet1);
	f5["children"].push(sommet1);
	f4["children"].push(f1); f1["children"].push(f4);
	f3["children"].push(f1); f1["children"].push(f3);
	f3["children"].push(f6); f6["children"].push(f3);
	f3["children"].push(f2); f2["children"].push(f3);
	//console.log(isBiconnected(sommet1));
	console.log(get_biconnected([sommet1,f1,f2,f3,f4,f5,f6]));

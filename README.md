##dum-tpl

A CommonJS module for generating and running templating using a limited Mustache syntax.

###DUM's Useless Mustache

DUM dum.  

    {{ugg}}

print value ugg if ugg number or ugg string.  ugg _NO_ HTML-escaped.   print nothing ugg falsy.  

else DUM _error!_  no ugg object.  no ugg array. 

    {{#ugg}}{{ugg}} thonk{{/ugg}}
    {{^ugg}}rrg{{/ugg}}

ugg truthy print value ugg then "thonk".  

ugg falsy print rrg.  

---

DUM no work deep objects.  DUM check flat object only.  

    obj = {ugg:true, rrg: false, thonk: "thonk"}

    {{#ugg}}
        {{thonk}}
        {{^rrg}}
            thunk!
        {{/rrg}}
    {{/ugg}}

good DUM.  show "thonk thunk!"

---

DUM no iteration.  Smash comma problem.  

DUM no data-binding.  data-binding make head hurt.  make _rage_.  make bad cave science.  

---

###Check out who's using DUM!

... just [me.](https://koglerjs.com)  
